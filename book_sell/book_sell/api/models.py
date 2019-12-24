from django.db import models
from django.urls import reverse

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=70, unique=True)
    author = models.CharField(max_length=50)
    genre = models.CharField(max_length=50)
    height = models.PositiveIntegerField()
    publisher = models.CharField(max_length=70)
    