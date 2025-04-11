import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/Categories/category.service';
import { Category } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {
 
  isLoading:boolean=false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,

    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      }
    },
    nav: true
  }

   CategoryList!:Category[]

  constructor(private _CategoryService:CategoryService){}
  ngOnInit(): void {
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
