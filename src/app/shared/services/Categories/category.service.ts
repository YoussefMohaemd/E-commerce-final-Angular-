import { brandsRes } from './../../interfaces/brands';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../base/enviroment';
import { CategoriesRes } from '../../interfaces/Categories';
import { Subcategories } from '../../interfaces/subcategories';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  



  constructor(private _HttpClient:HttpClient) { 
    
    

  }





  
  getAllCategories():Observable<CategoriesRes>{
    return this._HttpClient.get<CategoriesRes>(`${enviroment.baseUrl}/api/v1/categories`);
    
      }


      getSubCategories(cateId:string):Observable<Subcategories>{
        return this._HttpClient.get<Subcategories>(`${enviroment.baseUrl}/api/v1/categories/${cateId}/subcategories`);
        
          }

      getAllBrands():Observable<brandsRes>{
        return this._HttpClient.get<brandsRes>(`${enviroment.baseUrl}/api/v1/brands`);
        
          }
      
}

  



