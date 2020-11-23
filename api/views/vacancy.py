from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from api.filters.common import SkillsFilter
from api.serializers.firm import VacancyDetailSerializer
from firm.models import Vacancy


class VacancyView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = VacancyDetailSerializer
    queryset = Vacancy.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = SkillsFilter


class VacancyDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    serializer_class = VacancyDetailSerializer
    queryset = Vacancy.objects.all()
