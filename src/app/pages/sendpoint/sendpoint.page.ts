import { Component, OnInit } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import {AlertdataComponent} from "../alertdata/alertdata.component";
import {StoresService} from "../../services/stores.service";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sendpoint',
  templateUrl: './sendpoint.page.html',
  styleUrls: ['./sendpoint.page.scss'],
})
export class SendpointPage implements OnInit {
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catUserId:any;
  public points:any;
  public type:any;
  public email:any;
  public operationResult:any;
  public returnUsersData:any;
  public returnArrayUsersFromServer:any;
  public returnUsersArray:any = [];
  public countOfData:any;
  public users:any;
  public message:any;

  public userSelectId:any;
  public pageNum:any;

  public userinfoId:any;
  public mobileUserInfo:any;
  public mobileHide:any;
  public fullUserInfoName:any;
  public personalImage:any="../../assets/imgs/defThree.png";
  public catUserInfoId:any;
  public subUserInfoCatId:any;
  public cityUserInfoId:any;
  public regionUserInfoId:any;
  public serviceDetails:any;
  public imageType:any;
  public pointsUser:any;
  public errorPoints:any="";
  public isErrorUserPoints:any = 1;
  public isdisabled:boolean=true;
  public returnData:any;
  public isActive:any;
  public active:any;
  public catId:any;
  public checkIfSendPoints:any=0;
  public checkIfSendPointsNew:any=0;
  public checkIfSendPointsThree:any=0;
  public rate:any;
  public number:any;
  public errorNumber:any="";
  public isErrorUserNumber:any = 1;
  public numberLoginNum:any;
  public returnDataUser:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public checkPointEnter:any;
  public commercialName:any;
  public isSendPoints:any;
  public typeUserInfo:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public mobileNumber:any;
  public placeHolderLoginNumber:any;
  public errorLoginNumber:any;
  public serviceProvider:any;
  public sendPointPage:any;
  public sendPointFiald:any;
  public sendPointSucsess:any;
  public numPoint:any;
  public enterPoints:any;
  public noUser:any;
  public searchNum:any;
  public sendNow:any;
  public providingService:any;
  public enterWritePoint:any;
  public cancel:any;
  public noBalanceCard:any;
  public noPointEnough:any;
  public recharge:any;
  public alertFive:any;
  public alertTen:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private storesService : StoresService,private toastCtrl: ToastController,private modalController: ModalController,private alertController:AlertController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','information');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
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
    this.translate.get('placeHolderLoginNumber').subscribe((res: string) => {
      this.placeHolderLoginNumber = res;
    });
    this.translate.get('errorLoginNumber').subscribe((res: string) => {
      this.errorLoginNumber = res;
    });
    this.translate.get('serviceProvider').subscribe((res: string) => {
      this.serviceProvider = res;
    });
    this.translate.get('sendPointPage').subscribe((res: string) => {
      this.sendPointPage = res;
    });
    this.translate.get('sendPointFiald').subscribe((res: string) => {
      this.sendPointFiald = res;
    });
    this.translate.get('sendPointSucsess').subscribe((res: string) => {
      this.sendPointSucsess = res;
    });
    this.translate.get('numPoint').subscribe((res: string) => {
      this.numPoint = res;
    });
    this.translate.get('enterPoints').subscribe((res: string) => {
      this.enterPoints = res;
    });
    this.translate.get('noUser').subscribe((res: string) => {
      this.noUser = res;
    });
    this.translate.get('searchNum').subscribe((res: string) => {
      this.searchNum = res;
    });
    this.translate.get('sendNow').subscribe((res: string) => {
      this.sendNow = res;
    });
    this.translate.get('providingService').subscribe((res: string) => {
      this.providingService = res;
    });
    this.translate.get('enterWritePoint').subscribe((res: string) => {
      this.enterWritePoint = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
    this.translate.get('noBalanceCard').subscribe((res: string) => {
      this.noBalanceCard = res;
    });
    this.translate.get('noPointEnough').subscribe((res: string) => {
      this.noPointEnough = res;
    });
    this.translate.get('recharge').subscribe((res: string) => {
      this.recharge = res;
    });
    this.translate.get('alertFive').subscribe((res: string) => {
      this.alertFive = res;
    });
    this.translate.get('alertTen').subscribe((res: string) => {
      this.alertTen = res;
    });
    //content

    ////menue
    this.translate.get('menuOne').subscribe((res: string) => {
      this.menuOne = res;
    });
    this.translate.get('menuTow').subscribe((res: string) => {
      this.menuTow = res;
    });
    this.translate.get('menuThree').subscribe((res: string) => {
      this.menuThree = res;
    });
    this.translate.get('menuFor').subscribe((res: string) => {
      this.menuFor = res;
    });
    this.translate.get('menuFive').subscribe((res: string) => {
      this.menuFive = res;
    });
  }
  checkPoint(event:any){
    this.errorPoints = "succsessFiled";
    this.isErrorUserPoints = 1;
    this.pointsUser = event.target.value;
    if(this.pointsUser == "" || this.pointsUser == undefined){
      this.errorPoints = "errorFiled";
      this.isErrorUserPoints = 0;
    }else{
      let pointsArray = this.pointsUser.split("");
      for(let i=0;i<this.pointsUser.length;i++){
        let checkVal =/[0-9]/;
        if(!checkVal.test(this.pointsUser[i])){
          this.errorPoints = "errorFiled";
          this.isErrorUserPoints = 0;
          this.checkPointEnter = this.enterWritePoint
        }
      }
    }
    this.isEnterAllValues();
  }
  checkNumber(event:any){
    this.errorNumber = "succsessFiled";
    this.isErrorUserNumber = 1;
    this.number = event.target.value;
    this.checkIfSendPoints = 0;
    this.checkIfSendPointsNew = 0;
    this.checkIfSendPointsThree = 0;
    if(this.number == "" || this.number == undefined){
      this.errorNumber = "errorFiled";
      this.isErrorUserNumber = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.pointsUser != undefined && this.pointsUser != "" && this.number != undefined && this.number != ""){
      this.isdisabled = true;
    }
  }
  async functionGetData(userSelectId:any){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await loading.present();
    this.storesService.userInformation(userSelectId).then(async data=>{
      this.returnUsersData = data;
      this.operationResult = this.returnUsersData.Error.ErrorCode;
      if(this.operationResult==1){
        this.userinfoId = this.returnUsersData.Data.id;
        this.mobileUserInfo = this.returnUsersData.Data.mobile;
        this.mobileHide = this.returnUsersData.Data.mobileHide;
        this.typeUserInfo = this.returnUsersData.Data.type;
        if(this.typeUserInfo == 1 || this.typeUserInfo == 2){
          this.commercialName = this.returnUsersData.Data.fullName;
          this.personalImage = this.returnUsersData.Data.personalImage;
          if(this.personalImage== null || this.personalImage == 0 || this.personalImage == undefined)
            this.personalImage = "../../assets/imgs/defTow.png";
        }else{
          this.commercialName = this.returnUsersData.Data.commercialName;
          this.personalImage = this.returnUsersData.Data.accountImage;
          if(this.personalImage== null || this.personalImage == 0 || this.personalImage == undefined)
            this.personalImage = "../../assets/imgs/defTow.png";
        }
        this.serviceDetails = this.returnUsersData.Data.serviceDetails;
        if(this.checkLanguage){
          this.language = this.checkLanguage;
          if(this.language == "en"){
            this.catUserInfoId = this.returnUsersData.Data.catId_en;
            this.subUserInfoCatId = this.returnUsersData.Data.subCatId_en;
            this.cityUserInfoId = this.returnUsersData.Data.cityId_en;
            this.regionUserInfoId = this.returnUsersData.Data.regionsId_en;
          }
          else{
            this.catUserInfoId = this.returnUsersData.Data.catId_ar;
            this.subUserInfoCatId = this.returnUsersData.Data.subCatId_ar;
            this.cityUserInfoId = this.returnUsersData.Data.cityId_ar;
            this.regionUserInfoId = this.returnUsersData.Data.regionsId_ar;
          }
        }else{
          if (window.Intl && typeof window.Intl === 'object') {
            let Val  = navigator.language.split("-");
            if (Val[0])
              this.language = Val[0];
            else
              this.language = 'en';
            if(this.language == "en"){
              this.catUserInfoId = this.returnUsersData.Data.catId_en;
              this.subUserInfoCatId = this.returnUsersData.Data.subCatId_en;
              this.cityUserInfoId = this.returnUsersData.Data.cityId_en;
              this.regionUserInfoId = this.returnUsersData.Data.regionsId_en;
            }
            else{
              this.catUserInfoId = this.returnUsersData.Data.catId_ar;
              this.subUserInfoCatId = this.returnUsersData.Data.subCatId_ar;
              this.cityUserInfoId = this.returnUsersData.Data.cityId_ar;
              this.regionUserInfoId = this.returnUsersData.Data.regionsId_ar;
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
                this.catUserInfoId = this.returnUsersData.Data.catId_en;
                this.subUserInfoCatId = this.returnUsersData.Data.subCatId_en;
                this.cityUserInfoId = this.returnUsersData.Data.cityId_en;
                this.regionUserInfoId = this.returnUsersData.Data.regionsId_en;
              }
              else{
                this.catUserInfoId = this.returnUsersData.Data.catId_ar;
                this.subUserInfoCatId = this.returnUsersData.Data.subCatId_ar;
                this.cityUserInfoId = this.returnUsersData.Data.cityId_ar;
                this.regionUserInfoId = this.returnUsersData.Data.regionsId_ar;
              }
            }).catch(e => {console.log(e);});
          }
        }
      }
    }).catch(error=>{
      this.functionGetData(userSelectId)
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.userId == null || this.numberLogin == null   || this.fullName == null){
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
    }
    this.notifications();
    await this.funGetUserInformation(this.userId);
  }
  async funGetUserInformation(userId:any){
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
        this.isSendPoints = this.returnDataUser.Data.isSendPoints;
      }else{
        this.storage.remove('fullNameLogin');
        this.storage.remove('numberLogin');
        this.storage.remove('passwordLogin');
        this.storage.remove('type');
        this.storage.remove('userId');
        this.storage.remove('catId');
        this.storage.remove('subCatId');
        this.storage.remove('points');
        this.navCtrl.navigateRoot('login');
      }
    }).catch(e=>{
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
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
  async functionCheckNumberaAndPoint(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.number == undefined || this.number == "") && (this.pointsUser == undefined || this.pointsUser == "")){
      this.errorNumber = "errorFiled";
      this.isErrorUserNumber = 0;
      this.errorPoints = "errorFiled";
      this.isErrorUserPoints = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.number == undefined || this.number == ""){
      this.errorNumber = "errorFiled";
      this.isErrorUserNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.pointsUser == undefined || this.pointsUser == ""){
      this.errorPoints = "errorFiled";
      this.isErrorUserPoints = 0;
      this.isdisabled = false;
      return false;
    }
    this.numberLoginNum = '962'+this.numberLogin;
    if(this.number != undefined && this.pointsUser != undefined && this.number!=this.numberLoginNum) {
      this.storesService.checkNumberaAndPoint(this.userId,this.number).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.userSelectId = this.returnData.Data.userId;
          this.functionGetData(this.userSelectId)
          this.checkIfSendPoints = 1;
        }else if(this.operationResult==2){
          await this.checkAlert(1)
          this.checkIfSendPoints = 2;
        }else if(this.operationResult==3){
          await this.checkAlert(1)
          this.checkIfSendPoints = 3;
        }
      })
    }else{
      await this.checkAlert(3)
    }
    this.isdisabled = true;
    return true
  }
  functionDeleteSearch(){
    this.checkIfSendPoints = 0;
    this.number = "";
  }
  async sendPointsToUser(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','home');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.pointsUser == undefined || this.pointsUser == ""){
      this.errorPoints = "errorFiled";
      this.isErrorUserPoints = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.pointsUser != 0){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      await loading.present();
      this.storesService.sendPointsToUser(this.userId,this.userSelectId,this.pointsUser).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.points = this.points - this.pointsUser;
          await this.storage.set('points',this.points);
          this.checkIfSendPointsNew = 1;
          this.checkIfSendPoints = 0;
          this.number = "";
          this.pointsUser = "";
          await this.funGetUserInformation(this.userId);
        }else if(this.operationResult==2){
          this.checkIfSendPointsNew = 2;
        }else if(this.operationResult==3){
          await this.checkAlert(3)
          this.checkIfSendPoints = 5;
        }else if(this.operationResult==4){
          await this.checkAlert(2)
          this.checkIfSendPointsNew = 3;
        }else if(this.operationResult==5){
          await this.checkAlert(4)
          this.checkIfSendPointsNew = 4;
        }
      }).catch(async e=>{
        await this.checkAlert(2)
        this.checkIfSendPointsNew = 2;
      })
      this.isdisabled = true;
    }
    return true
  }
  async checkAlert(type:any){
    let model = await this.modalController.create({
      component:AlertdataComponent,
      animated:true,
      componentProps:{opera:type},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
    });
    await model.present();
  }
  chargeInformation(){
    this.router.navigateByUrl('chargeinformation');
  }
  functionGoToHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionGoServices(catId:any,catName:any){
    this.navCtrl.navigateRoot(['/services', {catId:catId,catName:catName}])
  }
  functionGoInvitations(){
    this.navCtrl.navigateRoot("/invitations");
  }
  functionGoToArchives(){
    this.navCtrl.navigateRoot("/archives");
  }
  functionOpenAccount(){
    this.navCtrl.navigateRoot("/account");
  }
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
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
    let typeUser = await this.storage.get('type');
    if(typeUser == 1){
      this.menu.enable(true,"third");
      this.menu.open("third");
    }else{
      this.menu.enable(true,"last");
      this.menu.open("last");
    }
  }
}
