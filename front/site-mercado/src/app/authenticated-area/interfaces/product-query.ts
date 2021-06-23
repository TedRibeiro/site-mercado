export interface ProductQueryParameters extends Record<string, any> {
  searchTerm?: string,
  pageNumber: number,
  pageSize: number,
  sortActive?: string,
  sortDirection?: string
}
