import { ApiClient } from './api-client';
import { Note, NoteInput, NoteParams } from '@/interfaces/note';
import { PaginatedResponse } from '@/interfaces/api';

class NoteService {
  private api: ApiClient<Note>;

  constructor() {
    this.api = new ApiClient<Note>('/api/notes/');
  }

  // 노트 목록 조회
  async getNotes(params?: NoteParams): Promise<PaginatedResponse<Note>> {
    return this.api.getAll({
      params,
    });
  }

  // 노트 상세 조회
  async getNote(id: number): Promise<Note> {
    return this.api.get(id);
  }

  // 노트 생성
  async createNote(data: NoteInput): Promise<Note> {
    return this.api.create(data);
  }

  // 노트 수정
  async updateNote(id: number, data: NoteInput): Promise<Note> {
    return this.api.update(id, data);
  }

  // 노트 부분 수정
  async patchNote(id: number, data: Partial<NoteInput>): Promise<Note> {
    return this.api.patch(id, data);
  }

  // 노트 삭제
  async deleteNote(id: number): Promise<void> {
    return this.api.delete(id);
  }
}

export const noteService = new NoteService();
