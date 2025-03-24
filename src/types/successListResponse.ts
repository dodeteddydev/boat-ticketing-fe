export type SuccessListResponse<T> = {
  message: string;
  data: T;
  paging: Paging;
};

export type Paging = {
  currentPage: number;
  totalPage: number;
  size: number;
};
