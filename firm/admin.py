from django.contrib import admin

from firm.forms.base import FirmForm, VacancyForm
from firm.models import Firm, Vacancy


@admin.register(Firm)
class FirmAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )
    form = FirmForm


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )
    autocomplete_fields = ['skills']
    form = VacancyForm
