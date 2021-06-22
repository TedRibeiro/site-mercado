import { Product, ProductList } from '../authenticated-area/interfaces/product';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

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
}
