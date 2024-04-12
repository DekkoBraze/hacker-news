from rest_framework import serializers
from .models import *
 
 
class NewsPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ('pk', 'title', 'author', 'rating', 'time_create')


class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ('pk', 'title', 'text', 'author', 'rating', 'time_create', 'time_update')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk', 'author', 'newsItem', 'text', 'time_create', 'time_update')