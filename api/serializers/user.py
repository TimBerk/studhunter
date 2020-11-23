from rest_framework import serializers
from django.contrib.auth.models import User

from user.models import Profile


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=True
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(source='user_profile')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'profile', )
        depth = 1
