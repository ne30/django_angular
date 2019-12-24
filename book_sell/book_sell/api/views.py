from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import bookSerializer, book2Serializer
from .models import Book
from rest_framework.response import Response

class bookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Book.objects.all().order_by('-date_joined')
    serializer_class = bookSerializer


    def list(self, request, *args, **kwargs):
        books = Book.objects.all()
        serializer = book2Serializer(books, many=True)
        return Response(serializer.data)