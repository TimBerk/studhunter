from ckeditor.widgets import CKEditorWidget
from django.forms import models
from resume.models import Resume


class ResumeForm(models.ModelForm):
    class Meta:
        model = Resume
        exclude = ('created_at', 'updated_at')

        widgets = {
            'about': CKEditorWidget()
        }
