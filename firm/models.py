from autoslug import AutoSlugField
from django.contrib.auth.models import User
from django.db import models
from pytils.translit import slugify

from resume.models.dictionaries import (
    Education,
    Employment,
    Experience,
    Salary,
    Scope,
    Schedule,
    Skill
)


STATUS_INACTIVE = 0
STATUS_ACTIVE = 1
STATUS_DRAFT = 2
STATUSES = (
    (STATUS_INACTIVE, 'неактивный'),
    (STATUS_ACTIVE, 'активный'),
    (STATUS_DRAFT, 'черновик')
)


def replace_in_slugify(value):
    value = slugify(value)
    return value.replace(' ', '-')


def get_upload_firm_logo_dir(i, f):
    return f'firms/{i.hash}/{f}'


class Firm(models.Model):
    manager = models.ForeignKey(User, verbose_name='Менеджер', on_delete=models.CASCADE, related_name='firm_manager')
    name = models.CharField(verbose_name='Название', max_length=255)
    slug = AutoSlugField(max_length=250, populate_from='name',
                         unique_with=['name'],
                         slugify=replace_in_slugify)
    description = models.TextField('Описание', blank=True, null=True)
    logo = models.ImageField(verbose_name='Логотип', upload_to=get_upload_firm_logo_dir, null=True, blank=True)
    site = models.CharField(verbose_name='Сайт', max_length=255, blank=True, null=True)
    adds = models.CharField(verbose_name='Адрес', max_length=255, blank=True, null=True)
    scopes = models.ManyToManyField(Scope, verbose_name='Сфера деятельности', related_name='firm_scopes')
    status = models.PositiveSmallIntegerField(verbose_name='Статус', choices=STATUSES, default=STATUS_ACTIVE)

    class Meta:
        verbose_name = 'Фирма'
        verbose_name_plural = 'Фирмы'

    def __str__(self):
        return self.name


class Vacancy(models.Model):
    QUALIFICATION = (
        (0, 'Не указана'),
        (1, 'Стажер (Intern)'),
        (2, 'Младший (Junior)'),
        (3, 'Средний (Middle)'),
        (4, 'Старший (Senior)'),
        (5, 'Ведущий (Leaf)')
    )

    firm = models.ForeignKey(Firm, verbose_name='Фирма', on_delete=models.CASCADE)
    name = models.CharField(verbose_name='Название', max_length=255)
    slug = AutoSlugField(max_length=250, populate_from='name',
                         unique_with=['name'],
                         slugify=replace_in_slugify)
    description = models.TextField('Описание', blank=True, null=True)

    employment = models.ForeignKey(Employment, verbose_name='Занятость', null=True, blank=True,
                                   on_delete=models.CASCADE, related_name="vacancy_salary")
    schedule = models.ForeignKey(Schedule, verbose_name='Время работы', null=True, blank=True,
                                 on_delete=models.CASCADE, related_name="vacancy_salary")
    salary = models.ForeignKey(Salary, verbose_name='Заработная плата', null=True, blank=True,
                               on_delete=models.CASCADE, related_name="vacancy_salary")
    qualification = models.SmallIntegerField(verbose_name='Квалификация', null=True, blank=True,
                                             choices=QUALIFICATION, default=0)
    experience = models.ForeignKey(Experience, verbose_name='Опыт работы', null=True, blank=True,
                                   on_delete=models.CASCADE, related_name="vacancy_salary")
    education = models.ForeignKey(Education, verbose_name='Образование', null=True, blank=True,
                                  on_delete=models.CASCADE, related_name="vacancy_salary")
    skills = models.ManyToManyField(Skill, verbose_name='Навыки', blank=True, related_name='vacancy_skills')
    status = models.PositiveSmallIntegerField(verbose_name='Статус', choices=STATUSES, default=STATUS_ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'

    def __str__(self):
        return self.name
