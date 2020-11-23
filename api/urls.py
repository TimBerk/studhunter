from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .yasg import urlpatterns as doc_urls
from api.views import user as user_view
from api.views import resume as resume_view
from api.views import dictionaries as dict_view
from api.views import vacancy as vacancy_view

app_name = 'api'
router = DefaultRouter()

urlpatterns = [
    path('auth/', include('djoser.urls.jwt')),
    path('auth/register/', user_view.RegisterApi.as_view()),
    path('auth/logout/', user_view.logout_view),
    path('auth/user/', user_view.UserDetailView.as_view()),

    path('dictionaries/employment/', dict_view.EmploymentView.as_view()),
    path('dictionaries/schedule/', dict_view.ScheduleView.as_view()),
    path('dictionaries/salary/', dict_view.SalaryView.as_view()),
    path('dictionaries/scope/', dict_view.ScopeView.as_view()),
    path('dictionaries/experience/', dict_view.ExperienceView.as_view()),
    path('dictionaries/education/', dict_view.EducationView.as_view()),
    path('dictionaries/direction/', dict_view.EduDirectionView.as_view()),
    path('dictionaries/skills/', dict_view.SkillView.as_view()),

    path('vacancy/', vacancy_view.VacancyView.as_view()),
    path('vacancy/<pk>/', vacancy_view.VacancyDetailView.as_view()),
]

router.register(r'resume', resume_view.ResumeView)

urlpatterns += doc_urls
urlpatterns += path('', include(router.urls)),
