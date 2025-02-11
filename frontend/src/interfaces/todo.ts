import { PaginationParams } from './api';

// Todo 우선순위 타입
export type Priority = 'high' | 'medium' | 'low';

// Todo 상태 타입
export type Status = 'pending' | 'completed';

// Todo 타입
export interface Todo {
  id: number;
  task: string;
  due_date: string;
  priority: Priority;
  status: Status;
  created_at: string;
}

// Todo 생성/수정 요청 타입
export interface TodoInput {
  task: string;
  due_date: string;
  priority: Priority;
  status?: Status;
}

// Todo API 쿼리 파라미터 타입
export interface TodoParams extends PaginationParams {
  due_date__gte?: string;
  due_date__lte?: string;
  priority?: Priority;
  status?: Status;
}

// Todo 통계 응답 타입
export interface TodoStatistics {
  total: number;
  completed: number;
  pending: number;
}
