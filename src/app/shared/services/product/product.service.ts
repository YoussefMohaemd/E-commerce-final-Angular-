import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../base/enviroment';
import { Observable } from 'rxjs';
import { Product, ProductRes } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService   {

  constructor(private _HttpClient:HttpClient) { 
    
    

  }



  getAllProducts():Observable<ProductRes>{
return this._HttpClient.get<ProductRes>(`${enviroment.baseUrl}/api/v1/products`);

  }


 getProductsById(productId:string):Observable<{data:Product}>{
  return this._HttpClient.get<{data:Product}>(`${enviroment.baseUrl}/api/v1/products/${productId}`)
 }

  
 
}
