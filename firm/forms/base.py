from ckeditor.widgets import CKEditorWidget
from django.forms import models
from firm.models import Firm, Vacancy


class FirmForm(models.ModelForm):
    class Meta:
        model = Firm
        exclude = ('created_at', 'updated_at')

        widgets = {
            'description': CKEditorWidget()
        }


class VacancyForm(models.ModelForm):
    class Meta:
        model = Vacancy
        exclude = ('created_at', 'updated_at')

        widgets = {
            'description': CKEditorWidget()
        }
