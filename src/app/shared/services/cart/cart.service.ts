import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { addProductRes, CartProduct } from '../../interfaces/Addproduct';
import { CartRes } from '../../interfaces/cart';
import { isPlatformBrowser } from '@angular/common';
import { enviroment } from '../../../base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartCount: BehaviorSubject<any> = new BehaviorSubject(0);

  userTokenHeader: HttpHeaders;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _HttpClient: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken') || '';
      this.userTokenHeader = new HttpHeaders({ token: token });

      if (token) {
        // _Router.navigate([localStorage.getItem('currentPage')]);
      }
    } else {
      this.userTokenHeader = new HttpHeaders(); // Empty headers if not in browser context
    }
  }

  addproductToCart(productId: string): Observable<addProductRes> {
    return this._HttpClient.post<addProductRes>(`${enviroment.baseUrl}/api/v1/cart`, { productId: productId }, {
      headers: this.userTokenHeader
    });
  }

  getloggedUserCart(): Observable<CartRes> {
    return this._HttpClient.get<CartRes>(`${enviroment.baseUrl}/api/v1/cart`, {
      headers: this.userTokenHeader
    });
  }

  updateProductCartCount(productId: string, count: string): Observable<CartRes> {
    return this._HttpClient.put<CartRes>(`${enviroment.baseUrl}/api/v1/cart/${productId}`, { count: count }, {
      headers: this.userTokenHeader
    });
  }

  removeProductfromCart(productId: string): Observable<CartRes> {
    return this._HttpClient.delete<CartRes>(`${enviroment.baseUrl}/api/v1/cart/${productId}`, {
      headers: this.userTokenHeader
    });
  }

  clearUserCart(): Observable<any> {
    return this._HttpClient.delete<any>(`${enviroment.baseUrl}/api/v1/cart`, {
      headers: this.userTokenHeader
    });
  }

  
}
