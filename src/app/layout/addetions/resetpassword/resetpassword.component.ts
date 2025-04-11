import { UserDataToken } from './../../../shared/interfaces/UserDataToken';
import { Router } from '@angular/router';
import { email } from './../../../shared/interfaces/data';
import { Component } from '@angular/core';
import { AuthhService } from '../../../shared/services/auth/authh.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  isLoading:boolean=false;
  errMsg?:string
 
  newPasswordForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required, Validators.email]),
    newPassword:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)])

  
   })
    
   constructor( private _AuthhService:AuthhService, private _Router:Router){
  
   }
  
   submitnewPasswordForm(){
    // @input() let Resetpassword=this.newPasswordForm.get('email')?.patchValue.(emailValue);
    if(this.newPasswordForm.valid){
      this.isLoading=true;

      this._AuthhService.NewPassword(this.newPasswordForm.value).subscribe({
   
        next : (res ) =>{
          console.log(res)
          this.isLoading=false;
          localStorage.setItem('userToken', res.token);
          this._AuthhService.decodeUserData();
          this._Router.navigate(['./home'])
      
        },
        error : (err) =>{
          console.log(err)
          this.isLoading=false;
  
          this.errMsg= err.error.message;
  
        }
      })
    }
  
  
   }


}
