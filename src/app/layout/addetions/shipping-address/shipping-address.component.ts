import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
  selectedPaymentMethod: string = 'online'; // default selection

  errMsg?:string
  isLoading:boolean=false;


  ShippingAddress:FormGroup =new FormGroup({

   detials:new FormControl(null,[Validators.required]),
   phone: new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
   city:new FormControl(null,[Validators.required])

    
   
   


  }) 

  constructor( private _OrderService:OrderService , private _ActivatedRoute:ActivatedRoute ,private _Router:Router){

  }


  checkOut(){
    
    if(this.ShippingAddress.valid){
 
      this.isLoading=true;
      this._ActivatedRoute.paramMap.subscribe({
        next : p =>{
          this._OrderService.checkOut( p.get('cartId')!, this.ShippingAddress.value).subscribe({

            next : res =>{
              this.isLoading=false;
              console.log(res);
              window.open(res.session.url, '_self');
            }
    
    
          })
        }
      })
      
    }
  }


  onPaymentMethodChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedPaymentMethod = selectElement.value;
  }


  orderNow() {

     console.log(this.ShippingAddress.value)
    if (this.selectedPaymentMethod === 'online') {
      this.checkOut()
      console.log('Processing Online order...');

    } else if (this.selectedPaymentMethod === 'cash') {
      this.cashOrder();
      console.log('Processing cash order...');

    }
  }



  cashOrder() {
    
    if(this.ShippingAddress.valid){
 
      this.isLoading=true;
      this._ActivatedRoute.paramMap.subscribe({
        next : p =>{
          this._OrderService.cashOrder( p.get('cartId')!, this.ShippingAddress.value).subscribe({

            next : res =>{
              this.isLoading=false;

              console.log(res.data);
              this._Router.navigate(['./allorders'])

            }
    
    
          })
        }
      })
      
    }  }
}
