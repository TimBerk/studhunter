from django_filters.rest_framework import FilterSet, CharFilter


class DictionaryFilter(FilterSet):
    search = CharFilter(field_name='name', lookup_expr='contains')


class SkillsFilter(FilterSet):
    search = CharFilter(field_name='skills_name', lookup_expr='contains')
