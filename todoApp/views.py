from wsgiref import validate
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from todoApp.models import List, User
from .serializers import ListSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'User': '/user/',
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
def taskList(request):
    tasks = List.objects.all().order_by('-id')
    serializer = ListSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def taskDetail(request, pk):
    tasks = List.objects.get(id=pk)
    serializer = ListSerializer(tasks, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def userDetail(request):
    user = User.objects.all().order_by('-id')
    serializer = UserSerializer(user,  many=True)
    return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
    serializer = ListSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def taskUpdate(request, pk):
    task = List.objects.get(id=pk)
    serializer = ListSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
    task = List.objects.get(id=pk)
    task.delete()

    return Response('Item succsesfully delete!')
