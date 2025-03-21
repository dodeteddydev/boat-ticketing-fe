export type SuccessListResponse<T> = {
  message: string;
  data: T;
  paging: Paging;
};

type Paging = {
  currentPage: number;
  totalPage: number;
  size: number;
};
