import json

import requests
from django.contrib.auth.models import User
from django.http import JsonResponse

from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from api.serializers.user import RegisterSerializer, UserSerializer, ProfileSerializer


class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        response = requests.post('http://localhost:8000/auth/jwt/create/', data={
            'username': request.data['username'], 'password': request.data['password']
        })
        content = response.content.decode('utf-8')
        content = json.loads(content)
        token = {
            "refresh": content.get('refresh'),
            "access": content.get('access'),
        }

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            "message": "Вы зарегестрировались",
        })


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        return queryset.filter(user=self.request.user)


class UserDetailView(APIView):

    def get(self, request):
        current_user = request.user
        if current_user.is_anonymous:
            return Response({})
        serializer = UserSerializer(current_user)
        return Response(serializer.data)

    def patch(self, request):
        current_user = request.user
        user_data = clear_dict(request.data)
        profile_data = user_data.get('profile')
        if 'profile' in user_data:
            del user_data['profile']
        serializer = UserSerializer(current_user, data=user_data, partial=True, allow_null=True)
        if serializer.is_valid():
            serializer.save()

            if profile_data:
                profile_serializer = ProfileSerializer(current_user.user_profile, data=profile_data,
                                                       partial=True, allow_null=True)
                if profile_serializer.is_valid():
                    profile_serializer.save()
            return JsonResponse(data=serializer.data, status=201, safe=False)
        return JsonResponse(status=400, data="wrong parameters")


def clear_dict(data):
    clean_data = {}
    for k, v in data.items():
        if isinstance(v, dict):
            child_dict = {}
            for ck, cv in v.items():
                if cv != '' and cv is not None:
                    child_dict[ck] = cv
            clean_data[k] = child_dict
        else:
            if v is not None or v:
                clean_data[k] = v

    return clean_data


@api_view(('POST',))
def logout_view(request):
    """Blacklist the refresh token: extract token from the header
      during logout request user and refresh token is provided"""
    refresh_token = request.data.get('token', None)
    if refresh_token:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response("Successful Logout", status=status.HTTP_200_OK)
    return Response("Incorrect token", status=status.HTTP_400_BAD_REQUEST)
