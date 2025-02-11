from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Todo
from datetime import date

class TodoTests(APITestCase):
    def setUp(self):
        # 테스트용 Todo 아이템 생성
        self.todo = Todo.objects.create(
            task="Test task",
            due_date=date(2025, 12, 31),
            priority="high",
            status="pending"
        )
        self.list_url = reverse('todo-list')
        self.detail_url = reverse('todo-detail', args=[self.todo.id])
        self.statistics_url = reverse('todo-statistics')

    def test_create_todo(self):
        """새로운 Todo 아이템을 생성할 수 있는지 테스트"""
        data = {
            "task": "New test task",
            "due_date": "2025-12-31",
            "priority": "medium",
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 2)
        self.assertEqual(Todo.objects.latest('id').task, "New test task")

    def test_list_todos(self):
        """Todo 목록을 조회할 수 있는지 테스트"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_get_todo(self):
        """특정 Todo 아이템을 조회할 수 있는지 테스트"""
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['task'], "Test task")

    def test_update_todo(self):
        """Todo 아이템을 수정할 수 있는지 테스트"""
        data = {
            "task": "Updated test task",
            "due_date": "2025-12-31",
            "priority": "high",
            "status": "completed"
        }
        response = self.client.put(self.detail_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Todo.objects.get(id=self.todo.id).task, "Updated test task")
        self.assertEqual(Todo.objects.get(id=self.todo.id).status, "completed")

    def test_delete_todo(self):
        """Todo 아이템을 삭제할 수 있는지 테스트"""
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)

    def test_filter_todos(self):
        """Todo 목록을 필터링할 수 있는지 테스트"""
        # 상태로 필터링
        response = self.client.get(f"{self.list_url}?status=pending")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

        # 우선순위로 필터링
        response = self.client.get(f"{self.list_url}?priority=high")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_statistics(self):
        """Todo 통계를 조회할 수 있는지 테스트"""
        response = self.client.get(self.statistics_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_tasks'], 1)
        self.assertEqual(response.data['completed_tasks'], 0)
        self.assertEqual(response.data['completion_rate'], 0)
