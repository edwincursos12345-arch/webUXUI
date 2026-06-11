"""
URL configuration for webUXUI project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from webUXUI_1 import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),

    
    path('crear_usuario/', views.crear_usuario),
    path('Proyectos/', views.proyectos, name='Proyectos'),
    path('proyectos_completados/', views.proyectos_completados),
    path('logout/', views.proyecto1),
    path('inicio_sesión/', views.inicio_sesión),

    path('CrearProyecto/', views.CrearProyecto, name='CrearProyecto'),
    # path('ProyectoDetalles/', views.ProyectoDetalles),

    path('Proyectos/<int:proyecto_id>/', views.ProyectoDetalles, name='ProyectoDetalles'),

    path('Proyectos/<int:proyecto_id>/completado', views.ProyectoCompletado, name='ProyectoCompletado'),

    path('Proyectos/<int:proyecto_id>/eliminar', views.ProyectoEliminado, name='ProyectoEliminado'),
    
    
    path('CorelDraw/', views.CorelDraw),
    path('Illustrator/', views.Illustrator),
    path('Photoshop/', views.Photoshop),
]
