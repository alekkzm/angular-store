import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com';
const KURS_DOLLARA = 75;

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAllProducts(limit = 12, sort = 'desc', category = ''): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${STORE_BASE_URL}/products${category && `/category/${category}`}?limit=${limit}&sort=${sort}`)
      .pipe(
        map(products => products.map(product => {
          product.price = Math.round(product.price * KURS_DOLLARA);
          return product;
        }))
      );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${STORE_BASE_URL}/products/categories`);
  }
}
