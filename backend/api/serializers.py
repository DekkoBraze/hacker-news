from rest_framework import serializers
from .models import *
 

# Для превью новости в списке на главной странице 
class NewsPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ('pk', 'title', 'author', 'rating', 'time_create')


# Для страницы новости
class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ('pk', 'title', 'news_link', 'author', 'rating', 'time_create', 'time_update')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk', 'author', 'children_comments', 'text', 'time_create', 'time_update')

    # Вложенные комментарии для данного
    children_comments = serializers.SerializerMethodField()

    def get_children_comments(self, obj):
        commentsToComment = Comment.objects.filter(parentComment=obj.pk)
        serializer_for_comments = CommentSerializer(
            instance=commentsToComment, 
            many=True
        )
        
        return serializer_for_comments.data
