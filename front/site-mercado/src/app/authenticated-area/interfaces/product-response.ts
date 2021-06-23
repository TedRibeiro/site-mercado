import { ProductList } from "./product";

export interface ProductPagingResponseData {
  data: ProductList,
  pagingData: PagingResponseData
}

export interface PagingResponseData {
  pageIndex: number,
  pageSize: number,
  length: number
}
