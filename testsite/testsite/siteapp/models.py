from django.db import models

# Create your models here.

class TabsList(models.Model):
    linksList = models.CharField(max_length=32,primary_key=True)
    links = models.TextField()
    
