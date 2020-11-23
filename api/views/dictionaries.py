from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

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

from api.filters.common import DictionaryFilter
from api.serializers.dictionaries import (
    EmploymentSerializer,
    ScheduleSerializer,
    SalarySerializer,
    ScopeSerializer,
    ExperienceSerializer,
    EducationSerializer,
    EduDirectionSerializer,
    SkillSerializer
)


class EmploymentView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = EmploymentSerializer
    queryset = Employment.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DictionaryFilter


class ScheduleView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DictionaryFilter


class SalaryView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = SalarySerializer
    queryset = Salary.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DictionaryFilter


class ScopeView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = ScopeSerializer
    queryset = Scope.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DictionaryFilter


class ExperienceView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DictionaryFilter


class EducationView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = EducationSerializer
    queryset = Education.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DictionaryFilter


class EduDirectionView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    pagination_class = None

    serializer_class = EduDirectionSerializer
    queryset = EduDirection.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DictionaryFilter


class SkillView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = SkillSerializer
    queryset = Skill.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DictionaryFilter
