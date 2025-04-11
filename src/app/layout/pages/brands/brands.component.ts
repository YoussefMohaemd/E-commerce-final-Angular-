import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/Categories/category.service';
import { brandsData } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
       
     brands!:brandsData[]
     isLoading:boolean=false;

  constructor(private _CategoryService:CategoryService){

  }

  ngOnInit(): void {
    if(typeof localStorage != 'undefined'){
      localStorage.setItem('currentPage' , '/brands');
  }
  this. getAllBrands();

  }


  getAllBrands(){
    this.isLoading=true;
    this._CategoryService.getAllBrands().subscribe({
 
      next : res =>{
         this.brands=res.data;
       
       console.log(res)
       this.isLoading=false;

      },
      error: err =>{

        this.isLoading=false;

      }

    })

  }

}
