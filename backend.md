# Django 백엔드 설계 계획

## 1. 데이터 모델 설계
현재 두 개의 주요 모델이 있습니다:

**Todo 모델**
```python
- id (PK)
- task (Text)
- due_date (Date)
- priority (String)
- status (String)
- created_at (DateTime)
```

**Note 모델**
```python
- id (PK)
- content (Text)
- created_at (DateTime)
```

## 2. API 엔드포인트 설계

**Todo API**
```
1. GET /api/todos/
   - 모든 할 일 목록 조회
   - 필터링 옵션: status, priority

2. POST /api/todos/
   - 새로운 할 일 생성
   - Required fields: task, due_date, priority

3. PUT /api/todos/{id}/
   - 할 일 수정
   - 상태 변경 포함

4. DELETE /api/todos/{id}/
   - 할 일 삭제

5. GET /api/todos/statistics/
   - 통계 정보 조회 (총 개수, 완료된 개수, 완료율)
```

**Note API**
```
1. GET /api/notes/
   - 모든 노트 조회

2. POST /api/notes/
   - 새로운 노트 생성
   - Required field: content

3. PUT /api/notes/{id}/
   - 노트 내용 수정

4. DELETE /api/notes/{id}/
   - 노트 삭제
```

## 3. Django 프로젝트 구조
```
backend/
├── manage.py
├── requirements.txt
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── todos/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   └── notes/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       └── urls.py
```

## 4. 기술 스택 및 라이브러리
```
- Django 4.2+
- Django REST Framework
- PostgreSQL (현재와 동일)
- django-filter (필터링 기능)
- drf-yasg (API 문서화)
```

## 5. 보안 및 인증
현재는 인증이 없지만, 향후 확장성을 고려하여 다음 기능 추가를 고려해볼 수 있습니다:
- JWT 기반 인증
- 사용자별 Todo 및 Note 관리
- CORS 설정

## 6. 개발 단계
1. Django 프로젝트 초기 설정
2. 데이터베이스 설정 및 모델 구현
3. API 뷰 및 시리얼라이저 구현
4. URL 라우팅 설정
5. API 문서화
6. 테스트 코드 작성
