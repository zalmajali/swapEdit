import { Component, OnInit,Input } from '@angular/core';
import {ModalController, Platform,NavController,LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import {UsersService} from "../../services/users.service";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.scss'],
})
export class SearchfilterComponent  implements OnInit {
  @Input() typeOfOper: number | any;
  @Input() servesName: number | any;
  public catIdUser:any;
  public returnsubCatData:any;
  public returnArraysubCatFromServer:any;
  public returnsubCatArray:any = [];
  public operationResult:any;
  public subCatIdUser:any;
  public countryId:any;
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catId:any;
  public points:any;
  public type:any;
  public email:any;
  public returnCitysData:any;
  public returnArrayCitysFromServer:any;
  public returnCitysArray:any = [];
  public returnCategoriesData:any;
  public returnArrayCategoriesFromServer:any;
  public returnCategoriesArray:any = [];
  public returnRegionsData:any;
  public returnArrayRegionsFromServer:any;
  public returnRegionsArray:any = [];
  public cityId:any;
  public regionId:any;
  public pointFrom:any;
  public pointTo:any;
  public servesDetalis:any;
  public delected:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public accountCatPlaceHolder: any;
  public accountSelect:any;
  public accountSubCatPlaceHolder:any;
  public accountCityPlaceHolder:any;
  public accountRegionPlaceHolder:any;
  public pointFromPlaceHolder:any;
  public pointtoPlaceHolder:any;
  public servesNamePlaceHolder:any;
  public servesDetalisPlaceHolder:any;
  public searchForm:any;
  public search:any;
  public selectValData:any;
  constructor(private storage: Storage,private categoriesService:CategoriesService,private globalization: Globalization, private translate: TranslateService,private activaterouter : ActivatedRoute,private loading: LoadingController,private usersService:UsersService,private navCtrl: NavController,private router : Router,private modalController: ModalController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  initialiseTranslation(){
    this.translate.get('selectValData').subscribe((res: string) => {
      this.selectValData = res;
    });
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('accountCatPlaceHolder').subscribe((res: string) => {
      this.accountCatPlaceHolder = res;
    });
    this.translate.get('accountSubCatPlaceHolder').subscribe((res: string) => {
      this.accountSubCatPlaceHolder = res;
    });
    this.translate.get('accountSelect').subscribe((res: string) => {
      this.accountSelect = res;
    });
    this.translate.get('accountCityPlaceHolder').subscribe((res: string) => {
      this.accountCityPlaceHolder = res;
    });
    this.translate.get('accountRegionPlaceHolder').subscribe((res: string) => {
      this.accountRegionPlaceHolder = res;
    });
    this.translate.get('pointFromPlaceHolder').subscribe((res: string) => {
      this.pointFromPlaceHolder = res;
    });
    this.translate.get('pointtoPlaceHolder').subscribe((res: string) => {
      this.pointtoPlaceHolder = res;
    });
    this.translate.get('servesNamePlaceHolder').subscribe((res: string) => {
      this.servesNamePlaceHolder = res;
    });
    this.translate.get('servesDetalisPlaceHolder').subscribe((res: string) => {
      this.servesDetalisPlaceHolder = res;
    });
    this.translate.get('searchForm').subscribe((res: string) => {
      this.searchForm = res;
    });
    this.translate.get('search').subscribe((res: string) => {
      this.search = res;
    });
  }
  async selectCatValues(event:any,type:any=0){
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(type == 0)
      this.catIdUser = event.target.value;
    else
      this.catIdUser = event;
    await this.categoriesService.productsSubCat(this.catIdUser).then(data=>{
      this.returnsubCatData = data;
      this.operationResult = this.returnsubCatData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnsubCatArray=[];
        this.returnArraysubCatFromServer = this.returnsubCatData.Data.subCat;
        for(let i = 0; i < this.returnArraysubCatFromServer.length;i++) {
          this.returnsubCatArray[i]=[];
          this.returnsubCatArray[i]['id'] = this.returnArraysubCatFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage
            if(this.language == "en"){
              this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_en;
            }
            else{
              this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_ar;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en"){
                this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_en;
              }
              else{
                this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_ar;
              }
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if (Val[0])
                  this.language = Val[0];
                else
                  this.language = 'en';
                if(this.language == "en"){
                  this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_en;
                }
                else{
                  this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
  }
  async selectCityValues(event:any){
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
      this.cityId = event.target.value;
    await this.categoriesService.regions(this.cityId).then(data=>{
      this.returnRegionsData = data;
      this.operationResult = this.returnRegionsData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnRegionsArray=[];
        this.returnArrayRegionsFromServer = this.returnRegionsData.Data.regions;
        for(let i = 0; i < this.returnArrayRegionsFromServer.length;i++) {
          this.returnRegionsArray[i]=[];
          this.returnRegionsArray[i]['id'] = this.returnArrayRegionsFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en"){
              this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
            }
            else{
              this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en"){
                this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
              }
              else{
                this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
              }
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if (Val[0])
                  this.language = Val[0];
                else
                  this.language = 'en';
                if(this.language == "en"){
                  this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
                }
                else{
                  this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
  }
  selectRegionValues(event:any){
    this.regionId = event.target.value;
  }
  checkPointFrom(event:any){
    this.pointFrom = event.target.value;
  }
  checkPointTo(event:any){
    this.pointTo = event.target.value;
  }
  selectSubCatValues(event:any){
    this.subCatIdUser = event.target.value;
  }
  async ngOnInit() {
    this.catIdUser = await this.storage.get('catIdUser');
    this.subCatIdUser = await this.storage.get('subCatIdUser');
    this.cityId = await this.storage.get('cityId');
    this.regionId = await this.storage.get('regionId');
    this.pointFrom = await this.storage.get('pointFrom');
    this.pointTo = await this.storage.get('pointTo');
    await this.selectCatValues(this.catIdUser,1)
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    this.countryId = await this.storage.get('countryId');
    await this.getDeviceLanguage();
    await this.categoriesService.citys(this.countryId).then(data=>{
      this.returnCitysData = data;
      this.operationResult = this.returnCitysData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCitysFromServer = this.returnCitysData.Data.citys;
        for(let i = 0; i < this.returnArrayCitysFromServer.length;i++) {
          this.returnCitysArray[i]=[];
          this.returnCitysArray[i]['id'] = this.returnArrayCitysFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en"){
              this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
            }
            else{
              this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en"){
                this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
              }
              else{
                this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
              }
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if (Val[0])
                  this.language = Val[0];
                else
                  this.language = 'en';
                if(this.language == "en"){
                  this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
                }
                else{
                  this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
    await this.categoriesService.productsCategories(this.typeOfOper).then(data=>{
      this.returnCategoriesData = data;
      this.operationResult = this.returnCategoriesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCategoriesFromServer = this.returnCategoriesData.Data.categories;
        for(let i = 0; i < this.returnArrayCategoriesFromServer.length;i++) {
          this.returnCategoriesArray[i]=[];
          this.returnCategoriesArray[i]['id'] = this.returnArrayCategoriesFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en")
              this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
            else
              this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en")
                this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
              else
                this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if (Val[0])
                  this.language = Val[0];
                else
                  this.language = 'en';
                if(this.language == "en")
                  this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
                else
                  this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0])
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0])
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
  async functionSearch(){
    this.modalController.dismiss({
      "catIdUser":this.catIdUser,
      "subCatIdUser":this.subCatIdUser,
      "cityId":this.cityId,
      "regionId":this.regionId,
      "pointFrom":this.pointFrom,
      "pointTo":this.pointTo
    })
  }
  closeModel(){
    this.modalController.dismiss({
    });
  }
}
