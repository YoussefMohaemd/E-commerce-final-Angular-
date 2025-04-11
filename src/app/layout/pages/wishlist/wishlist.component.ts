import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistData, Wishlistres } from '../../../shared/interfaces/wishlistres';
import { CartService } from '../../../shared/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  Wishdata: WishlistData[] = []; 
    isLoading:boolean=false;

  constructor(private _WishlistService:WishlistService,private toastr: ToastrService, private _CartService:CartService){

  }


  ngOnInit(): void {
      
    if(typeof localStorage != 'undefined')

    this.getloggedUserCart();
  }

  getloggedUserCart(){
    this.isLoading=true;
  
  
    this._WishlistService.getloggedUserWishList().subscribe({
  
      next: (res) => {
        this.Wishdata=res.data;
        console.log(res.data); 
        this.isLoading=false;
  
      },
      error : err =>{
        
      }
    })
  
  }


  removeProductFromWishlist(productId: string) {
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: res => {
        this.Wishdata = res.data;
        console.log(res);

        this.toastr.success(res.message , "" ,{
          progressBar: true ,
          progressAnimation: 'increasing'

 
 
       });   
      
       this.getloggedUserCart();

      },
      error: err => {
        console.log(err)
      }
    });
  }
  


  addproductToWishList(productId:string){
    this._WishlistService.addProductToWishlist(productId).subscribe({
  
      next : res =>{
  
        console.log(res);
        this.toastr.success(res.message , "" ,{
           progressBar: true ,
           progressAnimation: 'increasing'
  
  
        });

  
      }
    })
  
    }

    addproductToCart(productId:string){
      this._CartService.addproductToCart(productId).subscribe({
    
        next : res =>{
    
          console.log(res);
          // this.isadded=true
          this.removeProductFromWishlist(productId);
          this.toastr.success(res.message , "" ,{
             progressBar: true ,
             progressAnimation: 'increasing'
             
    
    
          });


    
        }
      })
  
 

 
}
}
