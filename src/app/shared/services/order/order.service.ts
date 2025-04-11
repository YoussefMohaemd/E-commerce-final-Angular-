import { address } from './../../interfaces/data';
import { Root } from './../../interfaces/ChekoutRes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../base/enviroment';
import {  allOrdersRes  } from '../../interfaces/all-orders';
import { CashOrderRes } from '../../interfaces/cashorderres';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  userTokenHeader = {
    token: localStorage.getItem('userToken') || ''


  }


  constructor(private _HttpClient: HttpClient) { }


  checkOut(cartId: string, data: address): Observable<Root> {

    return this._HttpClient.post<Root>(`${enviroment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${enviroment.baseUrlLocal}`, {
      shippingAddress: data
    }, { headers: this.userTokenHeader });
  }



  cashOrder(cartId: string, data: address): Observable<any> {
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/orders/${cartId}`, {
      ShippingAddress: data,
    }, { headers: this.userTokenHeader });

  }


  allOrdersUser(UserId: string): Observable<allOrdersRes[]> {

    return this._HttpClient.get<allOrdersRes[]>(`${enviroment.baseUrl}/api/v1/orders/user/${UserId}`)



  }







}
