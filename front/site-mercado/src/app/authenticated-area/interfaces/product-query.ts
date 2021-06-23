export interface ProductQueryParameters {
  [key: string]: string | number,
  searchTerm: string,
  pageNumber: number,
  pageSize: number,
  sortActive: string,
  sortDirection: string
}
