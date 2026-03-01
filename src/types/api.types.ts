export interface ApiResponse<TData = unknown> {
  success: boolean;
  message: string;
  data?: TData;
  meta?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
