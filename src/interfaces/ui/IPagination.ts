export interface IPagination {
  page: number;
  limit: number;
}

export interface IPaginationDto {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}
