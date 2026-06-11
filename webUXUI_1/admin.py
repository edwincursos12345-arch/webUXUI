from django.contrib import admin
from .models import Proyectos

# Register your models here.

class ProyectoAdmin(admin.ModelAdmin):
    readonly_fields = ("created", )


admin.site.register(Proyectos, ProyectoAdmin)