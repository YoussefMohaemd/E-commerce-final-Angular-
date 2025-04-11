import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthhService } from '../../../shared/services/auth/authh.service';
import { Router, RouterLink } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { OkResponse } from '../../../shared/interfaces/OkResponse';
import { FailedResponse } from '../../../shared/interfaces/FailedResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errMsg?:string
  isLoading:boolean=false;
  loginForm:FormGroup=new FormGroup({

    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)])

  })

  constructor( private _AuthhService:AuthhService , private _Router:Router){

  }

  submitLogin(){
    if(this.loginForm.valid){
 
      this.isLoading=true;
      this._AuthhService.signIn(this.loginForm.value).subscribe({

        next : (res) =>{
          this.isLoading=false;
           
          console.log(res);
          localStorage.setItem('userToken', res.token);
          this._AuthhService.decodeUserData();
            this._Router.navigate(['./home'])
        },

        error : (err) =>{
          this.isLoading=false;
          console.log(err);
          this.errMsg= err.error.message;
          

        }
      })
    }

  }

}
