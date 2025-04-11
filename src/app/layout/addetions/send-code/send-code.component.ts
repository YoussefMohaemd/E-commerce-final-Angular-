import { ResetpasswordComponent } from './../resetpassword/resetpassword.component';
import { AuthhService } from './../../../shared/services/auth/authh.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-code',
  standalone: true,
  imports: [ReactiveFormsModule,ResetpasswordComponent],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.scss'
})
export class SendCodeComponent {

  isLoading:boolean=false;
  errMsg?:string
  newPasswordFormFlage: boolean= false;
  codeFormFlage:boolean=true;

 codeForm:FormGroup = new FormGroup({
  resetCode:new FormControl(null,[Validators.required ,Validators.pattern(/^[0-9]{4,}$/)])

 }) 
 constructor(private _AuthhService:AuthhService , private _Router: Router){

 }

 submitCodeForm(){
  if(this.codeForm.valid){
    this.isLoading=true;

    this._AuthhService.VerifyResetCode(this.codeForm.value).subscribe({

      next : (res) =>{
        console.log(res)
        this.isLoading=false;
        this.codeFormFlage=false;

        this.newPasswordFormFlage=true

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
