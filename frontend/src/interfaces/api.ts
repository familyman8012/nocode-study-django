// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// API 에러 응답 타입
export interface ApiError {
  message: string;
  status: number;
}

// API 쿼리 파라미터 타입
export interface PaginationParams {
  page?: number;
}
