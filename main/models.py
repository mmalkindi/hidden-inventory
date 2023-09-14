from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=255)
    amount = models.IntegerField(default=1)
    description = models.TextField()
    price = models.IntegerField()
    tags = models.CharField(max_length=40, default="")
    date_added = models.DateField(auto_now_add=True)