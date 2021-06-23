import { Product, ProductList } from '../authenticated-area/interfaces/product';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductQueryParameters } from '../authenticated-area/interfaces/product-query';
import { ProductPagingResponseData } from '../authenticated-area/interfaces/product-response';


const API = `${environment.baseUrl}/api/product`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {}

  save(product: Product): Observable<Object> {
    return this.http.post(API, product);
  }

  update(product: Product): Observable<Object> {
    return this.http.put(`${API}/update/${product.id}`, product);
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${API}/${id}`);
  }

  list(): Observable<ProductList> {
    return this.http.get<ProductList>(API);

  }

  delete(id: string): Observable<Object> {
    return this.http.delete(`${API}/${id}`);
  }

  uploadPicture(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${API}/upload`, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  getPaged(queryParams: ProductQueryParameters): Observable<ProductPagingResponseData> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
        params = params.append(key, queryParams[key] ?? '');
    });

    return this.http.get<ProductPagingResponseData>(`${API}/paged`,{ params });
  }
}
