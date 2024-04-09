from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import NewsItemSerializer

class NewsItemAPIView(APIView):
    def get(self, request):
        queryset = NewsItem.objects.all()
        serializer_for_queryset = NewsItemSerializer(
            instance=queryset, 
            many=True
        )

        return Response(serializer_for_queryset.data, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})
