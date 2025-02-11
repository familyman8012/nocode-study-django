from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Note

# Create your tests here.

class NoteTests(APITestCase):
    def setUp(self):
        # 테스트용 Note 아이템 생성
        self.note = Note.objects.create(
            content="Test note content"
        )
        self.list_url = reverse('note-list')
        self.detail_url = reverse('note-detail', args=[self.note.id])

    def test_create_note(self):
        """새로운 Note를 생성할 수 있는지 테스트"""
        data = {
            "content": "New test note"
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 2)
        self.assertEqual(Note.objects.latest('id').content, "New test note")

    def test_list_notes(self):
        """Note 목록을 조회할 수 있는지 테스트"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_get_note(self):
        """특정 Note를 조회할 수 있는지 테스트"""
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], "Test note content")

    def test_update_note(self):
        """Note를 수정할 수 있는지 테스트"""
        data = {
            "content": "Updated test note"
        }
        response = self.client.put(self.detail_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Note.objects.get(id=self.note.id).content, "Updated test note")

    def test_delete_note(self):
        """Note를 삭제할 수 있는지 테스트"""
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Note.objects.count(), 0)
