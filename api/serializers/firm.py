from rest_framework import serializers

from firm.models import Firm, Vacancy
from api.serializers.dictionaries import (
    SkillSerializer
)


class FirmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firm
        fields = '__all__'


class VacancySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Vacancy
        fields = '__all__'


class VacancyDetailSerializer(serializers.ModelSerializer):
    employment = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    schedule = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    salary = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    scope = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    experience = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    education = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    qualification = serializers.CharField(source='get_qualification_display')
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Vacancy
        depth = 1
        fields = '__all__'
