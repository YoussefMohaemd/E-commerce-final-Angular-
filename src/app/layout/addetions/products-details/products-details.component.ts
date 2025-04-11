import { Product, ProductRes } from './../../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,

    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  
  isLoading:boolean=false;
  product!:Product;
  constructor(private _ProductService:ProductService , private _ActivatedRoute:ActivatedRoute,private _CartService:CartService ,private toastr: ToastrService,private _WishlistService:WishlistService){

  }
  ngOnInit(): void {
   this.getProductsById()
   
  }

  
  getProductsById(){
    this.isLoading=true;

    let id :string="";
    this._ActivatedRoute.params.subscribe({
      next : p  =>{
        id=p ['id']

      }
    })
    this._ProductService.getProductsById(id).subscribe({

        
      next : (res) =>{

        this.product=res.data

        console.log(res.data)
        this.isLoading=false


      }
    })

  }

  addproductToCart(productId:string){
    this._CartService.addproductToCart(productId).subscribe({
  
      next : res =>{
  
        console.log(res);
        this.toastr.success(res.message , "" ,{
           progressBar: true ,
           progressAnimation: 'increasing'
  
  
        });
  
      }
    })
  
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
}