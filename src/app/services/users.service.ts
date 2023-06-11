import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = "https://admin.eswapco.com/api2";
  public result:any;
  constructor(private http:HttpClient) {
  }
  async aboutApp(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"about").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async checkIfLoginApi(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"checkIfLogin").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async checkRegistrationApi(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"checkRegistration").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async newNotifications(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"newNotifications"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async cardMovements(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"cardMovements"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateUserToken(userId:any,token:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"updateUserToken"+"/"+userId+"/"+token,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async allNotifications(userId:any,limit:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"allNotifications"+"/"+userId+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async allAppNotifications(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"allAppNotifications").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async checkIfSiteWorkApi(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"checkIfSiteWork").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async policyApp(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"policy").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async deleteAccount(userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"deleteAccount"+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async contactUs(fullName:any,number:any,msg:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"contactUs"+"/"+fullName+"/"+number+"/"+msg,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async registration(number:any,invitation:any=0,password:any,code:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"registration"+"/"+number+"/"+invitation+"/"+password+"/"+code,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateAccount(userId:any,catIdUser:any,subCatIdUser:any,cityId:any,regionId:any,userName:any,commercialName:any,serviceDetails:any){
    return new Promise(resolve => {
      console.log(this.baseUrl+'/'+"updateAccount"+"/"+userId+"/"+catIdUser+"/"+subCatIdUser+"/"+cityId+"/"+regionId+"/"+userName+"/"+commercialName+"/"+serviceDetails)
      this.http.post(this.baseUrl+'/'+"updateAccount"+"/"+userId+"/"+catIdUser+"/"+subCatIdUser+"/"+cityId+"/"+regionId+"/"+userName+"/"+commercialName+"/"+serviceDetails,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateDataOne(userId:any,cityId:any,regionId:any,userName:any,selectStatusUser:any,birthDate:any,serviceDetails:any,sex:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"updateDataOne"+"/"+userId+"/"+cityId+"/"+regionId+"/"+userName+"/"+selectStatusUser+"/"+birthDate+"/"+serviceDetails+"/"+sex,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateDataTow(userId:any,catIdUser:any,subCatIdUser:any,cityId:any,regionId:any,userName:any,birthDate:any,serviceDetails:any,sex:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"updateDataTow"+"/"+userId+"/"+catIdUser+"/"+subCatIdUser+"/"+cityId+"/"+regionId+"/"+userName+"/"+birthDate+"/"+serviceDetails+"/"+sex,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateData(userId:any,catIdUser:any,subCatIdUser:any,cityId:any,regionId:any,userName:any,commercialName:any,typeWorkVal:any,employeeCount:any,serviceDetails:any,type:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"updateData"+"/"+userId+"/"+catIdUser+"/"+subCatIdUser+"/"+cityId+"/"+regionId+"/"+userName+"/"+commercialName+"/"+typeWorkVal+"/"+employeeCount+"/"+serviceDetails+"/"+type,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async addProduct(userId:any,catId:any,subCatIdUser:any,title:any,cityId:any,regionId:any,serviceDetails:any,productPoint:any,type:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"addProduct"+"/"+userId+"/"+catId+"/"+subCatIdUser+"/"+title+"/"+cityId+"/"+regionId+"/"+serviceDetails+"/"+productPoint+"/"+type,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async editProduct(userId:any,catId:any,subCatIdUser:any,title:any,cityId:any,regionId:any,serviceDetails:any,productPoint:any,servicesId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"editProduct"+"/"+userId+"/"+catId+"/"+subCatIdUser+"/"+title+"/"+cityId+"/"+regionId+"/"+serviceDetails+"/"+productPoint+"/"+servicesId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async uploadeImage(servicesId:any,image:any,type:any){
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"addImagesProduct"+"/"+servicesId+"/"+image+"/"+type,{headers}).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async deleteProduct(userId:any,serviceId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"deleteProduct"+"/"+userId+"/"+serviceId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async forgotPassword(number:any,code:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"forgotPassword"+"/"+number+"/"+code,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async activationUser(userId:any,activeCode:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"activation"+"/"+userId+"/"+activeCode,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async resenData(userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"resenData"+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async searchOperation(userId:any=0,data:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"searchOperation"+"/"+userId+"/"+data,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async changePassword(userId:any,oldPassword:any,newPassword:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"changePassword"+"/"+userId+"/"+oldPassword+"/"+newPassword,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async checkUser(number:any,password:any,code:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"checkUser"+"/"+number+"/"+password+"/"+code).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async information(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"information"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
