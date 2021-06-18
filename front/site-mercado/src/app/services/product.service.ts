import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(

  ) { }

  save(product: Product): Observable<boolean> {
    return of(true);
  }
}
