from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Proyectos(models.Model):
    Título = models.CharField(max_length=100)
    Descripción = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    datecompleted = models.DateTimeField(null=True, blank=True)
    Importante = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

def __str__(self):
    return self.title + '- by ' + self.user.username