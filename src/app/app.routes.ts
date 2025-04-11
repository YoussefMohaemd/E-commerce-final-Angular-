import { Subcategories } from './shared/interfaces/subcategories';
import { ProductsDetailsComponent } from './layout/addetions/products-details/products-details.component';
import { Routes, CanActivateFn } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/addetions/notfound/notfound.component';
import path from 'path';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/addetions/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './layout/addetions/resetpassword/resetpassword.component';
import { ShippingAddressComponent } from './layout/addetions/shipping-address/shipping-address.component';
import { AllordersComponent } from './layout/adettions/allorders/allorders.component';
import { WishlistComponent } from './layout/pages/wishlist/wishlist.component';
import { SubcategoriesComponent } from './layout/addetions/subcategories/subcategories.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch:'full'},
    { path: 'home', component: HomeComponent, canActivate : [authGuard] },
    { path: 'cart', component: CartComponent , canActivate : [authGuard]},
    { path: 'allorders', component: AllordersComponent, canActivate : [authGuard]  },

    { path: 'products', component: ProductsComponent  , canActivate : [authGuard]},
    { path: 'productsdetails/:id', component: ProductsDetailsComponent  , canActivate : [authGuard]},
    { path: 'subcategories/:id', component: SubcategoriesComponent  , canActivate : [authGuard]},

    { path: 'shippingaddress/:cartId', component:ShippingAddressComponent  , canActivate : [authGuard]},
    { path: 'wishlist', component: WishlistComponent , canActivate : [authGuard]},




    { path: 'brands', component:BrandsComponent  , canActivate : [authGuard] },
    { path: 'categories', component:CategoriesComponent  , canActivate : [authGuard]},
    { path: 'login', component:LoginComponent },
    { path: 'register', component:RegisterComponent },
    { path: 'forgetpassword', component:ForgetpasswordComponent },
    { path: 'resetPassword', component:ResetpasswordComponent },


    { path: '**', component: NotfoundComponent },





];
