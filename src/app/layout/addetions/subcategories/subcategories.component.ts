import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/Categories/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Daum, Subcategories } from '../../../shared/interfaces/subcategories';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent implements OnInit{
  isLoading: boolean=true;
  subCate!:Daum[] ;

  constructor(private _CategoryService:CategoryService , private _ActivatedRoute:ActivatedRoute){

  }


  ngOnInit(): void {
      this.getSubCategories()
  }


  



getSubCategories(){

  this.isLoading=true;

    let id :string="";
    this._ActivatedRoute.params.subscribe({
      next : p  =>{
        id=p ['id']

      }
    })
    this._CategoryService.getSubCategories(id).subscribe({

        
      next : (res) =>{

        this.subCate=res.data;

        console.log(res.data)
        this.isLoading=false


      }
    })


}

}