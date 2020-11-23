from django.db import models
from django.contrib.auth.models import User

from resume.models.dictionaries import (
    Education,
    EduDirection,
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


class Resume(models.Model):
    QUALIFICATION = (
        (0, 'Не указана'),
        (1, 'Стажер (Intern)'),
        (2, 'Младший (Junior)'),
        (3, 'Средний (Middle)'),
        (4, 'Старший (Senior)'),
        (5, 'Ведущий (Leaf)')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_resumes")
    name = models.CharField(verbose_name='Название', max_length=255)
    about = models.TextField('Обо мне')

    direction = models.ForeignKey(EduDirection, verbose_name='Направление подготовки', null=True, blank=True,
                                  on_delete=models.SET_NULL, related_name="resume_direction")
    employment = models.ForeignKey(Employment, verbose_name='Занятость', null=True, blank=True,
                                   on_delete=models.CASCADE, related_name="resume_employment")
    schedule = models.ForeignKey(Schedule, verbose_name='Время работы', null=True, blank=True,
                                 on_delete=models.CASCADE, related_name="resume_schedule")
    salary = models.ForeignKey(Salary, verbose_name='Заработная плата', null=True, blank=True,
                               on_delete=models.CASCADE, related_name="resume_salary")
    scope = models.ForeignKey(Scope, verbose_name='Сфера деятельности', null=True, blank=True,
                              on_delete=models.CASCADE, related_name="resume_scope")
    qualification = models.SmallIntegerField(verbose_name='Квалификация', null=True, blank=True,
                                             choices=QUALIFICATION, default=0)
    experience = models.ForeignKey(Experience, verbose_name='Опыт работы', null=True, blank=True,
                                   on_delete=models.CASCADE, related_name="resume_experience")
    education = models.ForeignKey(Education, verbose_name='Образование', null=True, blank=True,
                                  on_delete=models.CASCADE, related_name="resume_education")
    skills = models.ManyToManyField(Skill, verbose_name='Навыки', blank=True)
    status = models.PositiveSmallIntegerField(verbose_name='Статус', choices=STATUSES, default=STATUS_ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Резюме'
        verbose_name_plural = 'Резюме'
