import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { AuthhService } from '../../../shared/services/auth/authh.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean=false;
  errMsg:boolean = false;
  registerForm: FormGroup = new FormGroup({

    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]),
    rePassword: new FormControl(null,[Validators.required,]),
    phone: new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
   

  },{validators:this.checkRepasswordMatch});

 constructor(private _AuthhService:AuthhService, private _Router:Router){

 }

  registerSubmit(){
    if(this.registerForm.valid){
      this,this.isLoading=true;
       this._AuthhService.signUp(this.registerForm.value).subscribe({
        next: (res) =>{
        console.log(res)
           this._Router.navigate(['/login'])
        },
        error: (err) =>{
          console.log(err)
          this,this.isLoading=false;
          this.errMsg=err.error.message


        }
       })
    }
   console.log(this.registerForm);

  }


  checkRepasswordMatch(g:AbstractControl){

    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null;
    }else{
      g.get('rePassword')?.setErrors({mismatch:true});
      return{mismatch:true};
    }
  }

}
