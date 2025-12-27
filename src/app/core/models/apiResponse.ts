export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiResponseList<T> {
  success: boolean;
  message: string;
  data: T[];
  timestamp: string;
}

export interface PagedResponse<T> {
  page: number;
  content: T[];
  last: boolean;
  size: number;
  totalElements: number;
  totalPages: number;
  timestamp: string;
}
