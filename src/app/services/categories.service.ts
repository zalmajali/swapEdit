import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = "https://admin.eswapco.com/api2";
  public result:any;
  public fullNameLogin:any;
  public emailLogin:any;
  userId:any;
  constructor(private http:HttpClient,private storage: Storage) {
  }
  async questions(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"questions").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async citys(countryId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"citys/"+countryId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async regions(cityId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"regions/"+cityId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async productsSubCat(subCatSelect:any,search:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"productsSubCat/"+subCatSelect+"/"+search).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async subCat(subCatSelect:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"subCat/"+subCatSelect).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async setting(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"setting").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async settingVal(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"settingVal").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async complaintsCategories(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"complaintsCategories").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async categories(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"categories").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async productsCategories(typeOp:any=0,search:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"productsCategories/"+typeOp+"/"+search).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async countries(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"countries").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async allCategories(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"allCategories").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
