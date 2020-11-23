from django.db import models


class Education(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)

    class Meta:
        verbose_name = 'Образование'
        verbose_name_plural = 'Образование'

    def __str__(self):
        return self.name


class EduDirection(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)
    code = models.CharField(verbose_name='Код', max_length=10)

    class Meta:
        verbose_name = 'Направление подготовки'
        verbose_name_plural = 'Направления подготовки'

    def __str__(self):
        return self.name


class Employment(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)

    class Meta:
        verbose_name = 'Занятость'
        verbose_name_plural = 'Занятость'

    def __str__(self):
        return self.name


class Experience(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)

    class Meta:
        verbose_name = 'Опыт'
        verbose_name_plural = 'Опыт'

    def __str__(self):
        return self.name


class Salary(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)

    class Meta:
        verbose_name = 'Оплата труда'
        verbose_name_plural = 'Оплата труда'

    def __str__(self):
        return self.name


class Schedule(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)

    class Meta:
        verbose_name = 'График работы'
        verbose_name_plural = 'График работы'

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)

    class Meta:
        verbose_name = 'Навыки'
        verbose_name_plural = 'Навыки'

    def __str__(self):
        return self.name


class Scope(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)

    class Meta:
        verbose_name = 'Сфера деятельности'
        verbose_name_plural = 'Сфера деятельности'

    def __str__(self):
        return self.name


class ScopeSkills(models.Model):
    scope = models.ForeignKey(Scope, verbose_name='Сфера деятельности', on_delete=models.CASCADE)
    skills = models.ManyToManyField(Skill, verbose_name='Навыки', blank=True)

    class Meta:
        verbose_name = 'Навык в сфере деятельности'
        verbose_name_plural = 'Навыки в сфере деятельности'

    def __str__(self):
        return self.scope.name
