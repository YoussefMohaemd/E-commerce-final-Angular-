import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/Categories/category.service';
import { Category } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  CategoryList!:Category[]
  isLoading:boolean=false;

constructor(private _CategoryService:CategoryService){

}
  ngOnInit(): void {
    if(typeof localStorage != 'undefined'){
      localStorage.setItem('currentPage' , '/categories');
  }
  this.getAllCategories();
  }

    
  getAllCategories(){
    this.isLoading=true
    this._CategoryService.getAllCategories().subscribe({
      next : res =>{

         this.CategoryList=res.data;
        console.log(this.CategoryList);
        this.isLoading=false;

      },
      error : err =>{

        console.log(err);
        this.isLoading=false;

      }
    })

  }
 



}
