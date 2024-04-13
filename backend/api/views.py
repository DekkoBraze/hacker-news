from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import parsers
from datetime import datetime
from .models import *
from .serializers import *

class NewsListAPIView(APIView):
    def get(self, request):
        queryset = NewsItem.objects.all()
        serializer_for_queryset = NewsPreviewSerializer(
            instance=queryset, 
            many=True
        )

        return Response(serializer_for_queryset.data, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})
    

class NewsItemAPIView(APIView):
    def get(self, request, id):
        newsItem = NewsItem.objects.get(pk=id)
        commentsToNewsItem = Comment.objects.filter(newsItem=newsItem)
        serializer_for_newsItem = NewsItemSerializer(
            instance=newsItem, 
            many=False
        )
        serializer_for_comments = CommentSerializer(
            instance=commentsToNewsItem, 
            many=True
        )

        return Response({'itemNewsData': serializer_for_newsItem.data, 'comments': serializer_for_comments.data}, 
                        headers={"Access-Control-Allow-Origin": "http://localhost:3000"})


class PostCommentToNewsItemAPIView(APIView):
    parser_classes = (parsers.JSONParser,)

    def post(self, request):
        newsItem = NewsItem.objects.get(pk=request.data['newsItemPk'])
        new_comment = Comment(
            author=request.data['author'], 
            text=request.data['text'], 
            newsItem=newsItem, 
            time_create=datetime.now(), 
            time_update=datetime.now())
        new_comment.save()

        return Response({'message': 'OK'}, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})
    

class PostCommentToCommentAPIView(APIView):
    parser_classes = (parsers.JSONParser,)

    def post(self, request):
        parent = Comment.objects.get(pk=request.data['commentPk'])
        new_comment = Comment(
            author=request.data['author'], 
            text=request.data['text'], 
            parentComment=parent,
            time_create=datetime.now(), 
            time_update=datetime.now())
        new_comment.save()

        return Response({'message': 'OK'}, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})
