import { CartService } from './../../../shared/services/cart/cart.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthhService } from '../../../shared/services/auth/authh.service';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']  // Corrected to styleUrls
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  isMobileMenuOpen: boolean = false;
  toastr: any;
  CartCount:number=0


  constructor(public _AuthhService: AuthhService,private _FlowbiteService:FlowbiteService,@Inject(PLATFORM_ID) private platformId: Object,private _CartService: CartService ) {}

  ngOnInit(): void {
       
      
    if (isPlatformBrowser(this.platformId)) {
      const userToken = localStorage.getItem('userToken');
    }

         this._CartService.CartCount.subscribe({
          next: data =>

            this.CartCount=data
            
            

               

         })

    this._FlowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
       
    this._AuthhService.userData.subscribe({
      next: (userData) => {
        this.isLogin = userData != null;
        

         
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
 
getloggedUserCart(){


  this._CartService.getloggedUserCart().subscribe({

    next: (res) => {
      console.log(res.data); 

    },
    error : err =>{
      
    }
  })

}



 

 
}
