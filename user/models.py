from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    GENDER = ((1, 'мужской'), (2, 'женский'))
    QUALIFICATION = (
        (0, 'Не указана'),
        (1, 'Стажер (Intern)'),
        (2, 'Младший (Junior)'),
        (3, 'Средний (Middle)'),
        (4, 'Старший (Senior)'),
        (5, 'Ведущий (Leaf)')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    gender = models.SmallIntegerField(verbose_name='Пол', null=True, blank=True, choices=GENDER, default=1)
    birth_date = models.DateField(verbose_name='Дата рождения', null=True, blank=True)
    phone = models.CharField(verbose_name='Телефон', max_length=20, null=True, blank=True)
    location = models.CharField(verbose_name='Город', max_length=70, null=True, blank=True)
    avatar = models.ImageField(verbose_name='Аватар', upload_to='media/avatars/%Y/%m/%d', null=True, blank=True)

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профиль'

    def __str__(self):
        return f'{self.user.get_full_name()} user profile'


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
