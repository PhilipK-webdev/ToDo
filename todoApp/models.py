from django.db import models

# Create your models here.


class List(models.Model):
    item = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.item


class User(models.Model):
    fullname = models.CharField(max_length=200)
    password = models.IntegerField(unique=True)

    def __str__(self):
        return self.item
