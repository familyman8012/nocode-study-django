import { PaginationParams } from './api';

// 노트 타입
export interface Note {
  id: number;
  content: string;
  created_at: string;
}

// 노트 생성/수정 요청 타입
export interface NoteInput {
  content: string;
}

// 노트 API 파라미터 타입
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NoteParams extends PaginationParams {}
