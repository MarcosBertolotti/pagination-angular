import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'https://utn2019-avanzada2-tp9.herokuapp.com/api/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>
  {
    return this.http.get(this.url);
  }

  getProductsPageSize(page: number, size: number): Observable<any>
  {
    return this.http.get(this.url + '?page=' + page + '&size=' + size)
  }

  getProductsOrderByPageSize(order: string, page:number, size:number): Observable<any>
  {
    return this.http.get(this.url + '?orderBy=' + order + '&page=' + page + '&size=' + size)
  }

  getProductsDirectionPageSize(direction: string, page: number, size: number): Observable<any>
  {
    return this.http.get(this.url + '?direction=' + direction + '&page=' + page + '&size=' + size)
  }

  getProductsDirectionOrderByPageSize(direction: string, order: string, page: number, size: number): Observable<any>
  {
    return this.http.get(this.url + '?direction=' + direction + '&orderBy=' + order + '&page=' + page + '&size=' + size)
  }

}
