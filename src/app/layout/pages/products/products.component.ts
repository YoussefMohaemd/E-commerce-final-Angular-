import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe, UpperCasePipe, OnsalePipe, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  userWord: string = "";
  isLoading: boolean = false;
  productList!: Product[];

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/home');
    }
    this.getAllProduct();
  }

  getAllProduct() {
    this.isLoading = true;
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data.map((product: Product) => ({
          ...product,
          isInWishlist: false // Initialize isInWishlist property for each product
        }));
        console.log(res.data);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addproductToCart(productId: string) {
    this._CartService.addproductToCart(productId).subscribe({
      next: res => {
        console.log(res);
        this.toastr.success(res.message, "", {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  toggleWishlist(product: Product) {
    product.isInWishlist = !product.isInWishlist;

    if (product.isInWishlist) {
      this.addProductToWishlist(product._id);
    } else {
      this.removeProductFromWishlist(product._id);
    }
  }

  addProductToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: res => {
        console.log(res);
        this.toastr.success(res.message, "", {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  removeProductFromWishlist(productId: string) {
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: res => {
        console.log(res);
        this.toastr.success(res.message, "", {
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }
}
