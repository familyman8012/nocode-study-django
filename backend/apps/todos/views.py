from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.

class TodoFilter(filters.FilterSet):
    class Meta:
        model = Todo
        fields = {
            'status': ['exact'],
            'priority': ['exact'],
            'due_date': ['gte', 'lte'],
        }

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filterset_class = TodoFilter
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        total_tasks = self.get_queryset().count()
        completed_tasks = self.get_queryset().filter(status='completed').count()
        completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
        
        return Response({
            'total_tasks': total_tasks,
            'completed_tasks': completed_tasks,
            'completion_rate': round(completion_rate, 1)
        })
