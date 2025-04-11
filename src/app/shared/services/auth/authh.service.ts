import { NewPassword } from './../../interfaces/data';
import { UserDataToken } from './../../interfaces/UserDataToken';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { code, email, LoginData, registerData } from '../../interfaces/data';
import { enviroment } from '../../../base/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { OkResponse } from '../../interfaces/OkResponse';
import { FailedResponse } from '../../interfaces/FailedResponse';
import { jwtDecode } from "jwt-decode";
import { json } from 'stream/consumers';
import { log } from 'console';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { resForgetPass } from '../../interfaces/resForgetpass';



@Injectable({
  providedIn: 'root'
})
export class AuthhService {

  userData!: BehaviorSubject<UserDataToken | null> ;


  constructor(private _HttpClient: HttpClient , private _Router:Router , @Inject(PLATFORM_ID) private platformId: Object) {
   

    
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken')) {
        this.decodeUserData();
        // _Router.navigate([localStorage.getItem('currentPage')]);
      }
    }else{
      this.userData= new  BehaviorSubject<UserDataToken | null>(null);
    }

   }
  
  

  signUp(data: registerData): Observable<OkResponse | FailedResponse> {
    return this._HttpClient.post<OkResponse | FailedResponse>(`${enviroment.baseUrl}/api/v1/auth/signup`, data);
  }

  signIn(data: LoginData): Observable<OkResponse> {
    return this._HttpClient.post<OkResponse>(`${enviroment.baseUrl}/api/v1/auth/signin`, data);
  }


  decodeUserData() {
   this.userData = new  BehaviorSubject<UserDataToken | null>(null);
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode<UserDataToken | null>(token);
    
    this.userData.next(decoded
      

    );
    console.log(this.userData.getValue());
    return decoded?.id; // Ensure that UserId is returned

  }


 logOut(){

  localStorage.removeItem('userToken');
  this.userData.next(null);
  this._Router.navigate(['/login'])
 }


 forgetPassword(data:email): Observable<resForgetPass>
 {
  return this._HttpClient.post<resForgetPass>(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords` , data)
 }

 
 VerifyResetCode(data:code): Observable<resForgetPass>
 {
  return this._HttpClient.post<resForgetPass>(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode` , data)
 }


 
 NewPassword(data:NewPassword): Observable<OkResponse>
 {
  return this._HttpClient.put<OkResponse>(`${enviroment.baseUrl}/api/v1/auth/resetPassword` , data)
 }




}
