from rest_framework import serializers

from resume.models.dictionaries import (
    Employment,
    Schedule,
    Salary,
    Scope,
    Experience,
    Education,
    EduDirection,
    Skill
)


class EmploymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employment
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Schedule
        fields = '__all__'


class SalarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Salary
        fields = '__all__'


class ScopeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scope
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Experience
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = '__all__'


class EduDirectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = EduDirection
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill
        fields = '__all__'
