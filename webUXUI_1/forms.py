from django import forms
from .models import Proyectos

class ProyectoForm(forms.ModelForm):
    class Meta:
        model = Proyectos
        fields = ['Título', 'Descripción', 'Importante']
        widgets = {
            'Título': forms.TextInput(attrs={'class': 'proyectos_input', 'placeholder': 'Escribe aquí el título del proyecto'}),
            'Descripción': forms.Textarea(attrs={'class': 'proyectos_textarea', 'placeholder': 'Escribe aquí la descripción del proyecto'}),
            
        }