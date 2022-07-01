from rest_framework import serializers
from .models import List, User


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
