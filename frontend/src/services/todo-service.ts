import { ApiClient } from './api-client';
import { Todo, TodoInput, TodoParams, TodoStatistics } from '@/interfaces/todo';
import { PaginatedResponse } from '@/interfaces/api';
import { axiosInstance } from '@/lib/axios';

class TodoService {
  private api: ApiClient<Todo>;

  constructor() {
    this.api = new ApiClient<Todo>('/api/todos/');
  }

  // Todo 목록 조회
  async getTodos(params?: TodoParams): Promise<PaginatedResponse<Todo>> {
    return this.api.getAll({
      params,
    });
  }

  // Todo 상세 조회
  async getTodo(id: number): Promise<Todo> {
    return this.api.get(id);
  }

  // Todo 생성
  async createTodo(data: TodoInput): Promise<Todo> {
    return this.api.create(data);
  }

  // Todo 수정
  async updateTodo(id: number, data: TodoInput): Promise<Todo> {
    return this.api.update(id, data);
  }

  // Todo 부분 수정
  async patchTodo(id: number, data: Partial<TodoInput>): Promise<Todo> {
    return this.api.patch(id, data);
  }

  // Todo 삭제
  async deleteTodo(id: number): Promise<void> {
    return this.api.delete(id);
  }

  // Todo 통계 조회
  async getTodoStatistics(): Promise<TodoStatistics> {
    const response = await axiosInstance.get<TodoStatistics>('/api/todos/statistics/');
    return response.data;
  }
}

export const todoService = new TodoService();
