from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.serializers.resume import ResumeSerializer, ResumeDetailSerializer
from resume.models import Resume


class ResumeView(ModelViewSet):
    queryset = Resume.objects.all()

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update' or self.action == 'retrieve':
            return ResumeSerializer
        return ResumeDetailSerializer

    def get_queryset(self):
        current_user = self.request.user
        if current_user.is_anonymous:
            return []
        if current_user.is_superuser:
            return Resume.objects.all()
        return current_user.user_resumes.all()

    def create(self, request, *args, **kwargs):
        current_user = self.request.user
        if current_user.is_anonymous:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        data['qualification'] = 1
        data['user'] = current_user.pk
        data['skills'] = clean_skills(data['skills'])
        serializer = ResumeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            skills_ids = [item for item in data['skills']]

            for skill in skills_ids:
                serializer.instance.skills.add(skill)

            return Response(serializer.data)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        current_user = self.request.user
        if current_user.is_anonymous:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

        current_resume = self.get_object()
        if current_resume is None:
            return Response({'error': 'Resume not found'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        data['skills'] = clean_skills(data['skills'])
        data['user'] = current_resume.user_id
        serializer = ResumeSerializer(current_resume, data=data)

        if serializer.is_valid():
            serializer.save()

            skills_ids = [item for item in data['skills']]
            skills_left = []
            for skill in current_resume.skills.all():
                if skill.id not in skills_ids:
                    current_resume.skills.remove(skill)
                else:
                    skills_left.append(skill.id)

            for skill in skills_ids:
                if skill not in skills_left:
                    current_resume.skills.add(skill)

            return Response(serializer.data)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


def clean_skills(data):
    skills = []

    for skill in data:
        skills.append(skill.get('value'))

    return skills
