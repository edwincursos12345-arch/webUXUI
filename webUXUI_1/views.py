from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm 
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.db import IntegrityError
from .forms import ProyectoForm
from .models import Proyectos
from django.utils import timezone
from django.contrib.auth.decorators import login_required

# Create your views here.

def index(request):
    return render(request, 'index.html')

# def about(request):
#     return render(request, 'about.html')

def CorelDraw(request):
    return render(request, 'Corel Draw.html')

def Illustrator(request):
    return render(request, 'Illustrator.html')

def Photoshop(request):
    return render(request, 'Photoshop.html')


def crear_usuario(request):

    if request.method == 'GET':
        return render(request, 'crear_usuario.html', {
            'form': UserCreationForm
        })
    
    else:
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'])
                user.save() 
                login(request, user)
                return redirect('Proyectos')
            except IntegrityError:
                return render(request, 'crear_usuario.html', {
                'form': UserCreationForm,
                "error": 'El Usuario ya Existe'
                })  
            except ValueError:
                return render(request, 'crear_usuario.html', {
                'form': UserCreationForm,
                'error': 'Por Favor Proporciona Datos Válidos'
                })
        return render(request, 'crear_usuario.html', {
                'form': UserCreationForm,
                "error": 'Las Contraseñas no Coinciden'
        }) 

@login_required
def proyectos(request):
    proyecto = Proyectos.objects.filter(user=request.user, datecompleted__isnull=True).order_by('-datecompleted')
    return render(request, 'Proyectos.html', {'proyectos': proyecto})

@login_required
def proyectos_completados(request):
    proyecto = Proyectos.objects.filter(user=request.user, datecompleted__isnull=False)
    return render(request, 'Proyectos.html', {'proyectos': proyecto})

@login_required
def proyecto1(request): 
    logout(request)
    return redirect('index')

def inicio_sesión(request):
    if request.method == 'GET':
        return render(request, 'inicio_sesión.html', {
        'form': AuthenticationForm
    })
    else:
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request, 'inicio_sesión.html', {
        'form': AuthenticationForm,
        'error': 'Usuario o Contraseña son Incorrectos'
        })
        else:
            login(request, user)
            return redirect('Proyectos')

@login_required
def CrearProyecto(request):
    if request.method == 'GET':
        return render(request, 'CrearProyecto.html', {
        'form': ProyectoForm
        })
    else:
        try:
            form = ProyectoForm(request.POST)
            nuevoProyecto = form.save(commit=False)
            nuevoProyecto.user = request.user
            nuevoProyecto.save() 
            return redirect('Proyectos')
        except ValueError:
            return render(request, 'CrearProyecto.html', {
                'form': ProyectoForm,
                'error': 'Por Favor Proporciona Datos Válidos'
            })
        
@login_required
def ProyectoDetalles(request, proyecto_id):
    if request.method == 'GET':
        proyecto = get_object_or_404(Proyectos, pk=proyecto_id, user=request.user)
        form = ProyectoForm(instance=proyecto)
        return render(request, 'ProyectoDetalles.html', {'proyecto': proyecto, 'form':form
        })
    else:
        try:
            proyecto = get_object_or_404(Proyectos, pk=proyecto_id, user=request.user)
            form = ProyectoForm(request.POST, instance=proyecto)
            form.save()
            return redirect('Proyectos')
        except ValueError:
            return render(request, 'ProyectoDetalles.html', {'proyecto': proyecto, 'form':form, 'error': "Error al Actualizar el Proyecto"
        })

@login_required
def ProyectoCompletado(request, proyecto_id):
    proyecto = get_object_or_404(Proyectos, pk=proyecto_id, user=request.user)
    if request.method == 'POST':
        proyecto.datecompleted = timezone.now()
        proyecto.save()
        return redirect('Proyectos')

@login_required
def ProyectoEliminado(request, proyecto_id):
    proyecto = get_object_or_404(Proyectos, pk=proyecto_id, user=request.user)
    if request.method == 'POST':
        proyecto.delete()
        return redirect('Proyectos')