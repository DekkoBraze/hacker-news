from rest_framework import serializers
from .models import *
 
 
class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ('title', 'author', 'rating', 'time_create', 'time_update')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('author', 'newsItem' 'text', 'time_create', 'time_update')