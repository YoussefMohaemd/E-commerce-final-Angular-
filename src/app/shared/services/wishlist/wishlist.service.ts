import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../base/enviroment';
import { Observable } from 'rxjs';
import { Addwishlistres } from '../../interfaces/addwishlistres';
import { Wishlistres } from '../../interfaces/wishlistres';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  userTokenHeader={ 
    token : localStorage.getItem('userToken') || '' 
  
  
  }

  constructor(private _HttpClient:HttpClient) { 

  


 
  }
 

  getloggedUserWishList(): Observable <Wishlistres>{


    return this._HttpClient.get<Wishlistres>(`${enviroment.baseUrl}/api/v1/wishlist`, {
      headers: this.userTokenHeader
    });
  }


  addProductToWishlist(productId:string):Observable<Addwishlistres>{
  
     return this._HttpClient.post<Addwishlistres>(`${enviroment.baseUrl}/api/v1/wishlist`, { productId: productId }, {
      headers: this.userTokenHeader
    });

  }

  removeProductFromWishlist(productId:string):Observable<any>{
  
    return this._HttpClient.delete<any>(`${enviroment.baseUrl}/api/v1/wishlist/${productId}`, {
     headers: this.userTokenHeader
   });

 }

}
