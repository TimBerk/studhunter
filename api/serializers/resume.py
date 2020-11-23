from rest_framework import serializers

from resume.models import Resume
from api.serializers.dictionaries import (
    SkillSerializer
)


class ResumeSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Resume
        fields = '__all__'


class ResumeDetailSerializer(serializers.ModelSerializer):
    employment = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    schedule = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    salary = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    scope = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    experience = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    education = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    direction = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    qualification = serializers.CharField(source='get_qualification_display')
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Resume
        depth = 1
        fields = '__all__'
