from django.db import models

class NewsItem(models.Model):
    title = models.CharField(max_length=128)
    news_link = models.CharField(max_length=128, default='')
    rating = models.IntegerField(default=0)
    author = models.CharField(max_length=32)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-time_create']

    def __str__(self):
        return self.title
        

class Comment(models.Model):
    author = models.CharField(max_length=32)
    text = models.CharField(max_length=255)
    newsItem = models.ForeignKey("NewsItem", on_delete=models.CASCADE, blank=True, null=True)
    parentComment = models.ForeignKey('Comment', on_delete=models.CASCADE, blank=True, null=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['time_create']

    def __str__(self):
        return self.text
