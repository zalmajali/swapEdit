import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.page.html',
  styleUrls: ['./usertype.page.scss'],
})
export class UsertypePage implements OnInit {
  public numberLogin:any;
  public userId:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public operationResult:any;
  public returnData:any;
  public points:any;
  public backgroundColorOne:any="#ffffff";
  public backgroundColorTow:any="#ffffff";
  public backgroundColorThree:any="#ffffff";
  public backgroundColorFore:any="#ffffff";
  public imageselectOne:any="../../assets/imgs/uncheck-icon.png";
  public imageselectTow:any="../../assets/imgs/uncheck-icon.png";
  public imageselectThree:any="../../assets/imgs/uncheck-icon.png";
  public imageselectFore:any="../../assets/imgs/uncheck-icon.png";
  public typeUser:any;
//langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public floatTow:any;
  public checkImagDiv:any;
  public next:any;
  public isdisabled:boolean=false;
  public userTypeTitle:any;
  public userTypeSelect:any;
  public userTypeTitleOne:any;
  public userTypeSubTitleOne:any;
  public userTypeSubSubTitleOne:any;
  public userTypeTitleTow:any;
  public userTypeSubTitleTow:any;
  public userTypeSubSubTitleTow:any;
  public userTypeTitleThree:any;
  public userTypeSubSubTitleThree:any;
  public userTypeTitleFor:any;
  public userTypeSubSubTitleFor:any;
  public myInformation:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','usertype');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('balanceServse').subscribe((res: string) => {
      this.balanceServse = res;
    });
    this.translate.get('point').subscribe((res: string) => {
      this.point = res;
    });
    this.translate.get('swap').subscribe((res: string) => {
      this.swap = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('floatTow').subscribe((res: string) => {
      this.floatTow = res;
    });
    this.translate.get('checkImagDiv').subscribe((res: string) => {
      this.checkImagDiv = res;
    });
    this.translate.get('next').subscribe((res: string) => {
      this.next = res;
    });
    this.translate.get('userTypeTitle').subscribe((res: string) => {
      this.userTypeTitle = res;
    });
    this.translate.get('userTypeSelect').subscribe((res: string) => {
      this.userTypeSelect = res;
    });
    this.translate.get('userTypeTitleOne').subscribe((res: string) => {
      this.userTypeTitleOne = res;
    });
    this.translate.get('userTypeSubTitleOne').subscribe((res: string) => {
      this.userTypeSubTitleOne = res;
    });
    this.translate.get('userTypeSubSubTitleOne').subscribe((res: string) => {
      this.userTypeSubSubTitleOne = res;
    });
    this.translate.get('userTypeTitleTow').subscribe((res: string) => {
      this.userTypeTitleTow = res;
    });
    this.translate.get('userTypeSubTitleTow').subscribe((res: string) => {
      this.userTypeSubTitleTow = res;
    });
    this.translate.get('userTypeSubSubTitleTow').subscribe((res: string) => {
      this.userTypeSubSubTitleTow = res;
    });
    this.translate.get('userTypeTitleThree').subscribe((res: string) => {
      this.userTypeTitleThree = res;
    });
    this.translate.get('userTypeSubSubTitleThree').subscribe((res: string) => {
      this.userTypeSubSubTitleThree = res;
    });
    this.translate.get('userTypeTitleFor').subscribe((res: string) => {
      this.userTypeTitleFor = res;
    });
    this.translate.get('userTypeSubSubTitleFor').subscribe((res: string) => {
      this.userTypeSubSubTitleFor = res;
    });
    this.translate.get('myInformation').subscribe((res: string) => {
      this.myInformation = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    /*this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.points = await this.storage.get('points');
    if(this.userId == null || this.numberLogin == null){
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
    }*/
    await this.checkIfSiteWork();
    this.notifications();
  }
  selectTypeUser(type:any){
    this.typeUser = type;
    this.isdisabled = true;
    this.backgroundColorOne="#ffffff";
    this.backgroundColorTow="#ffffff";
    this.backgroundColorThree="#ffffff";
    this.backgroundColorFore="#ffffff";
    this.imageselectOne="../../assets/imgs/uncheck-icon.png";
    this.imageselectTow="../../assets/imgs/uncheck-icon.png";
    this.imageselectThree="../../assets/imgs/uncheck-icon.png";
    this.imageselectFore="../../assets/imgs/uncheck-icon.png";
    if(type == 1){
      this.backgroundColorOne="#e9e9ea";
      this.imageselectOne="../../assets/imgs/selected-icon-green.png";
    }
    if(type == 2){
      this.backgroundColorTow="#e9e9ea";
      this.imageselectTow="../../assets/imgs/selected-icon-green.png";
    }
    if(type == 3){
      this.backgroundColorThree="#e9e9ea";
      this.imageselectThree="../../assets/imgs/selected-icon-green.png";
    }
    if(type == 4){
      this.backgroundColorFore="#e9e9ea";
      this.imageselectFore="../../assets/imgs/selected-icon-green.png";
    }
  }
  nextPage(){
    this.navCtrl.navigateRoot(['/information', {typeUser:this.typeUser}])
  }
  async notifications(){
    this.usersService.newNotifications(this.userId).then(async data=>{
      this.returnNotfiData = data;
      this.operationResult = this.returnNotfiData.Error.ErrorCode;
      if(this.operationResult==1){
        this.newNotifications = this.returnNotfiData.Data.numSelectNotifications;
      }else{
        this.newNotifications = 0;
      }
    }).catch(e=>{
      this.newNotifications = 0;
    })
    setTimeout(()=>{
      this.notifications();
    },3500)
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
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
