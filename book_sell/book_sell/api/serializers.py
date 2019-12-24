from rest_framework import serializers
from .models import Book

class bookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'height', 'publisher']


class book2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'genre', 'height', 'publisher')