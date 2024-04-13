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
        fields = ('pk', 'author', 'children_comments', 'text', 'time_create', 'time_update')

    children_comments = serializers.SerializerMethodField()

    def get_children_comments(self, obj):
        commentsToComment = Comment.objects.filter(parentComment=obj.pk)
        serializer_for_comments = CommentSerializer(
            instance=commentsToComment, 
            many=True
        )
        
        return serializer_for_comments.data
