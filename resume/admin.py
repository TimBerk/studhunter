from django.contrib import admin

# Register your models here.
from resume.forms.resume import ResumeForm
from resume.models import dictionaries, main


@admin.register(dictionaries.Education)
class DictionaryEducationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )


@admin.register(dictionaries.EduDirection)
class EduDirectionEducationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'code']
    list_display_links = ['name']
    search_fields = ('name', 'code', )


@admin.register(dictionaries.Employment)
class DictionaryEmploymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )


@admin.register(dictionaries.Experience)
class DictionaryExperienceAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )


@admin.register(dictionaries.Salary)
class DictionarySalaryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )


@admin.register(dictionaries.Schedule)
class DictionaryScheduleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )


@admin.register(dictionaries.Skill)
class DictionarySkillAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )


@admin.register(dictionaries.Scope)
class DictionaryScopeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )


@admin.register(dictionaries.ScopeSkills)
class ScopeSkillsAdmin(admin.ModelAdmin):
    list_display = ['id', 'scope']
    list_display_links = ['scope']
    search_fields = ('scope__name', )
    autocomplete_fields = ['skills']


@admin.register(main.Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['name']
    search_fields = ('name', )
    autocomplete_fields = ['skills']
    form = ResumeForm
