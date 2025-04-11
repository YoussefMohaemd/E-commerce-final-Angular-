import { email } from './../../../shared/interfaces/data';
import { AuthhService } from './../../../shared/services/auth/authh.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendCodeComponent } from '../send-code/send-code.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { get } from 'http';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ ReactiveFormsModule,SendCodeComponent,ResetpasswordComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss', '/src/styles.scss']
})
export class ForgetpasswordComponent {
  isLoading:boolean=false;
  errMsg?:string
  emailFormFlage:boolean=true;
  codeFormFlage:boolean=false;
  newPasswordFormFlage:boolean=false;



 emailForm:FormGroup = new FormGroup({
  email:new FormControl(null,[Validators.required, Validators.email])

 })
  
 constructor( private _AuthhService:AuthhService){

 }

 submitEmailform(){

  var emailValue=this.emailForm.get('email')?.value
  if(this.emailForm.valid){
    this.isLoading=true;

    this._AuthhService.forgetPassword(this.emailForm.value).subscribe({

      next : (res) =>{
        console.log(res)
        this.isLoading=false;
        this.emailFormFlage=false
        this.codeFormFlage=true;

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
