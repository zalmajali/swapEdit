import { Component, OnInit,ViewChild } from '@angular/core';
import {MenuController, Platform, NavController, IonSlides, ModalController, ToastController,IonInput} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {SearchfilterComponent} from "../searchfilter/searchfilter.component";
@Component({
  selector: 'app-homeout',
  templateUrl: './homeout.page.html',
  styleUrls: ['./homeout.page.scss'],
})
export class HomeoutPage implements OnInit {
  public categoriesHome:any=0;
  public categories:any='all';
  public operationResult:any;
  public returnCategoriesData:any;
  public returnArrayCategoriesFromServer:any;
  public returnCategoriesArray:any = [];
  public fullNameLogin:any;
  public emailLogin:any;
  public returnData:any;
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catId:any;
  public points:any;
  public type:any;
  public email:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public isActive:any;
  public active:any;
  public message:any;
  public returnDataUser:any;
  public searchVal:any;
  public returnSettingData:any;
  public operationResultVal:any;
  public image:any;
  public catIdUser:any;
  public subCatIdUser:any;
  public cityId:any;
  public regionId:any;
  public pointFrom:any;
  public pointTo:any;
  public servesName:any;
  public servesDetalis:any;
  public selectClassOne:any="categoriesHomeCardSelect";
  public selectClassTow:any="categoriesHomeCardUnSelect";
  public typeWork:any=1;
  public services:any;
  public products:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public float: any;
  public home:any;
  public searchForm:any;
  public noDataTitle:any;
  public noDataSubTitle:any;
  public floatD:any;
  constructor(private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private toastCtrl: ToastController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','homeout');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('home').subscribe((res: string) => {
      this.home = res;
    });
    this.translate.get('searchForm').subscribe((res: string) => {
      this.searchForm = res;
    });
    this.translate.get('noDataTitle').subscribe((res: string) => {
      this.noDataTitle = res;
    });
    this.translate.get('noDataSubTitle').subscribe((res: string) => {
      this.noDataSubTitle = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('services').subscribe((res: string) => {
      this.services = res;
    });
    this.translate.get('products').subscribe((res: string) => {
      this.products = res;
    });
  }
  checkSearch(event:any){
    this.searchVal = event.target.value;
  }
  functionChangeType(type:any){
    if(type == 1){
      this.typeWork=1;
      this.selectClassOne="categoriesHomeCardSelect"
      this.selectClassTow="categoriesHomeCardUnSelect"
    }else{
      this.typeWork=2;
      this.selectClassOne="categoriesHomeCardUnSelect"
      this.selectClassTow="categoriesHomeCardSelect"
    }
    this.functionGetData(this.typeWork);
  }
 async searchValues(){
    let val = 0;
    if(this.searchVal!=undefined && this.searchVal!=null&& this.searchVal!=0 && this.searchVal!=""){
      await this.usersService.searchOperation(val,this.searchVal).then(data=>{
      });
      this.navCtrl.navigateRoot(['/searchout', {type:this.typeWork,searchVal:this.searchVal}])
    }

  }
  functionGetData(type:any){
    this.categoriesService.productsCategories(type).then(async data=>{
      await this.storage.get('checkLanguage').then(async checkLanguage=>{
        this.checkLanguage = checkLanguage
      });
      this.returnCategoriesData = data;
      this.operationResult = this.returnCategoriesData.Error.ErrorCode;
      this.returnCategoriesArray=[];
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
          this.returnCategoriesArray[i]['image'] = this.returnArrayCategoriesFromServer[i].image;
        }
        let countOfData = this.returnCategoriesArray.length;
        if(countOfData == 0)
          this.categories = 0;
        else{
          this.categories = 1;
        }
      }else
        this.categories = 0;
    });
  }
  async ngOnInit() {
    this.storage.remove('catIdUser');
    this.storage.remove('subCatIdUser');
    this.storage.remove('cityId');
    this.storage.remove('regionId');
    this.storage.remove('pointFrom');
    this.storage.remove('pointTo');
    this.storage.remove('servesDetalis');
    this.storage.remove('servesName');
    await this.getDeviceLanguage();
    await this.categoriesService.setting().then(async data=>{
      this.returnSettingData = data;
      this.operationResultVal = this.returnSettingData.Error.ErrorCode;
      if(this.operationResultVal==1){
        await this.storage.set('facebookLink',this.returnSettingData.Data.facebookLink);
        await this.storage.set('youtupeLink',this.returnSettingData.Data.youtupeLink);
        await this.storage.set('instagramLink',this.returnSettingData.Data.instagramLink);
      }
    });
    await this.checkIfSiteWork();
    this.functionGetData(this.typeWork);
  }
  async checkIfSiteWork(){
    this.usersService.checkIfSiteWorkApi().then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult!=1){
        this.navCtrl.navigateRoot("/sitework");
      }
    }).catch(e=>{
      this.navCtrl.navigateRoot("/sitework");
    })
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
  functionGoServices(catId:any,catName:any){
    this.navCtrl.navigateRoot(['/servicesout', {catId:catId,catName:catName}])
  }
  async displayResult(message:any){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
