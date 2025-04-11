import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartRes, Data } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  data!: Data;  // Holds the cart data
  isLoading: boolean = false;

  constructor(private _CartService: CartService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check if localStorage is available
      if (typeof localStorage !== 'undefined') {
        this.getloggedUserCart();
      } else {
        console.error('localStorage is not available.');
      }
    } else {
      console.warn('Not running in a browser environment.');
    }
  }

  getloggedUserCart() {
    this.isLoading = true;

    this._CartService.getloggedUserCart().subscribe({
      next: (res) => {
        this.data = res.data;  // Assign correct cart data
        console.log(res.data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching cart data:', err);
        this.isLoading = false;
      }
    });
  }

  updateProductCartCount(productId: string, count: number) {
    if (count <= 0) {
      this.removeProductFromCart(productId);
    } else {
      this._CartService.updateProductCartCount(productId, count.toString()).subscribe({
        next: (res) => {
          console.log('Product count updated:', res);
          this.data = res.data;  // Assign updated cart data
        },
        error: (err) => {
          console.error('Error updating product count:', err);
        }
      });
    }
  }

  removeProductFromCart(productId: string) {
    this._CartService.removeProductfromCart(productId).subscribe({
      next: (res) => {
        console.log('Product removed from cart:', res);
        this.data = res.data; 
        this._CartService.CartCount.next(res.numOfCartItems)
            },
      error: (err) => {
        console.error('Error removing product from cart:', err);
      }
    });
  }

  clearUserCart() {
    this.isLoading = true;
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        console.log('Cart cleared:', res);
        if (res.message === 'success') {
          this.data = res.data || [];  // Ensure `data` is set properly when cart is cleared
        }
        this.isLoading = false;
        this.getloggedUserCart();
        this._CartService.CartCount.next(0); // Refresh the cart
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
        this.isLoading = false;
      }
    });
  }
}
