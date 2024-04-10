from django.db import models

class NewsItem(models.Model):
    title = models.CharField(max_length=128)
    text = models.CharField(max_length=1024, default='')
    rating = models.IntegerField(default=0)
    author = models.CharField(max_length=32)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class Comment(models.Model):
    author = models.CharField(max_length=32)
    text = models.CharField(max_length=255)
    newsItem = models.ForeignKey("NewsItem", on_delete=models.CASCADE)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text
