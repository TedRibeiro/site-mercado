import { Product, ProductList } from './../interfaces/product';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

const API = `${environment.baseUrl}/product`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {}

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(API, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${API}/update/${product.id}`, product);
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${API}/${id}`);
  }

  list(): Observable<ProductList> {
    return this.http.get<ProductList>(API);

  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${API}/${id}`);
  }

  uploadPicture(file: File) {
    const formData = new FormData();
    console.log(file);
    formData.append('file', file);

    return this.http.post(`${API}/upload`, formData, {
      observe: 'events',
      reportProgress: true
    });
  }
}
