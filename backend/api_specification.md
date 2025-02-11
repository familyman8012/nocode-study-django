# API Specification

## Data Models

### Todo Model
```python
- id (PK)
- task (Text)
- due_date (Date)
- priority (String: high, medium, low)
- status (String: pending, completed)
- created_at (DateTime)
```

### Note Model
```python
- id (PK)
- content (Text)
- created_at (DateTime)
```

## API Endpoints

### Todo API

#### 1. List/Create Todos
- **GET** `/api/todos/`
  - List all todos
  - Query Parameters:
    - `status`: Filter by status (pending, completed)
    - `priority`: Filter by priority (high, medium, low)
    - `due_date`: Filter by due date range
  - Response: List of todo objects with pagination

- **POST** `/api/todos/`
  - Create a new todo
  - Required fields: task, due_date, priority
  - Response: Created todo object

#### 2. Retrieve/Update/Delete Todo
- **GET** `/api/todos/{id}/`
  - Get a specific todo
  - Response: Todo object

- **PUT** `/api/todos/{id}/`
  - Update a todo
  - Fields: task, due_date, priority, status
  - Response: Updated todo object

- **DELETE** `/api/todos/{id}/`
  - Delete a todo
  - Response: 204 No Content

#### 3. Todo Statistics
- **GET** `/api/todos/statistics/`
  - Get todo statistics
  - Response:
    ```json
    {
      "total_tasks": integer,
      "completed_tasks": integer,
      "completion_rate": float
    }
    ```

### Note API

#### 1. List/Create Notes
- **GET** `/api/notes/`
  - List all notes
  - Response: List of note objects with pagination

- **POST** `/api/notes/`
  - Create a new note
  - Required field: content
  - Response: Created note object

#### 2. Retrieve/Update/Delete Note
- **GET** `/api/notes/{id}/`
  - Get a specific note
  - Response: Note object

- **PUT** `/api/notes/{id}/`
  - Update a note
  - Field: content
  - Response: Updated note object

- **DELETE** `/api/notes/{id}/`
  - Delete a note
  - Response: 204 No Content

## Authentication and Security
- Currently no authentication required
- CORS enabled for development

## Technical Stack
- Django 4.2+
- Django REST Framework
- PostgreSQL
- django-filter (for filtering)
- drf-yasg (for API documentation)

## Project Structure
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
