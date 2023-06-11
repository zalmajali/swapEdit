import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController,ModalController,IonSlides, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import {StoresService} from "../../services/stores.service";
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {ShowimageComponent} from "../showimage/showimage.component";
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Component({
  selector: 'app-servicesdetalis',
  templateUrl: './servicesdetalis.page.html',
  styleUrls: ['./servicesdetalis.page.scss'],
})
export class ServicesdetalisPage implements OnInit {
  @ViewChild('slidesSearviceHome',{static:false}) slides:IonSlides | any;
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
  public servicesId:any;
  public pageNum:any;
  public mobileUser:any;
  public mobileHideUser:any;
  public typeUser:any;
  public fullNameUser:any;
  public commercialNameUser:any;
  public titlePro:any;
  public image1:any;
  public image2:any;
  public image3:any;
  public catIdPro:any;
  public subCatIdPro:any;
  public cityIdPro:any;
  public regionsIdPro:any;
  public serviceDetailsPro:any;
  public pointsPro:any;
  public imageType:any;
  public returnDataUser:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public catIdUser:any;
  public subCatIdUser:any;
  public cityIdUser:any;
  public regionsIdUser:any;
  public usersIdService:any;
  public personalImage:any;
  public normobile:any;
  //langSeting
  public languageSelect:any;
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public floatTow:any;
  public detailsNote:any;
  public problemReport:any;
  public calling:any;
  public sendMsg:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private inAppBrowser: InAppBrowser,private modalController: ModalController,private globalization: Globalization, private translate: TranslateService,private callNumber: CallNumber,private storesService : StoresService,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','services');
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
    this.translate.get('detailsNote').subscribe((res: string) => {
      this.detailsNote = res;
    });
    this.translate.get('problemReport').subscribe((res: string) => {
      this.problemReport = res;
    });
    this.translate.get('calling').subscribe((res: string) => {
      this.calling = res;
    });
    this.translate.get('sendMsg').subscribe((res: string) => {
      this.sendMsg = res;
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
  functionCallNumber(numer:any){
    this.callNumber.callNumber(numer, true)
      .then(async res =>{
        await this.functionAddCall();
      })
      .catch(err =>{
        this.message = this.detailsNote;
        this.displayResult(this.message);
      });
  }
  async functionGetData(servicesId:any){
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await loading.present();
    this.storesService.servicesDetails(servicesId).then(async data=>{
      this.returnUsersData = data;
      this.operationResult = this.returnUsersData.Error.ErrorCode;
      if(this.operationResult==1){
        this.usersIdService = this.returnUsersData.Data.userId;
        this.mobileUser = this.returnUsersData.Data.mobile;
        this.normobile = this.returnUsersData.Data.normobile;
        this.mobileHideUser = this.returnUsersData.Data.mobileHide;
        this.typeUser = this.returnUsersData.Data.type;
        if(this.typeUser == 1 || this.typeUser == 2){
          this.fullNameUser = this.returnUsersData.Data.fullName;
          this.personalImage = this.returnUsersData.Data.personalImage;
          if(this.personalImage== null || this.personalImage == 0 || this.personalImage == undefined)
            this.personalImage = "../../assets/imgs/defTow.png";
        }else{
          this.fullNameUser = this.returnUsersData.Data.commercialName;
          this.personalImage = this.returnUsersData.Data.accountImage;
          if(this.personalImage== null || this.personalImage == 0 || this.personalImage == undefined)
            this.personalImage = "../../assets/imgs/defTow.png";
        }
        this.titlePro = this.returnUsersData.Data.title;
        this.pointsPro = this.returnUsersData.Data.points;
        this.image1 = this.returnUsersData.Data.image1;
        this.image2 = this.returnUsersData.Data.image2;
        this.image3 = this.returnUsersData.Data.image3;
        if(this.checkLanguage){
          this.language = this.checkLanguage;
          if(this.language == "en"){
            this.catIdPro = this.returnUsersData.Data.catIdEn;
            this.subCatIdPro = this.returnUsersData.Data.subCatIdEn;
            this.cityIdPro = this.returnUsersData.Data.cityIdEn;
            this.regionsIdPro = this.returnUsersData.Data.regionsIdEn;
            this.catIdUser = this.returnUsersData.Data.catIdUserEn;
            this.subCatIdUser = this.returnUsersData.Data.subCatIdUserEn;
            this.cityIdUser = this.returnUsersData.Data.cityIdUserEn;
            this.regionsIdUser = this.returnUsersData.Data.regionsIdUserEn;
          }
          else{
            this.catIdPro = this.returnUsersData.Data.catIdAr;
            this.subCatIdPro = this.returnUsersData.Data.subCatIdAr;
            this.cityIdPro = this.returnUsersData.Data.cityIdAr;
            this.regionsIdPro = this.returnUsersData.Data.regionsIdAr;
            this.catIdUser = this.returnUsersData.Data.catIdUserAr;
            this.subCatIdUser = this.returnUsersData.Data.subCatIdUserAr;
            this.cityIdUser = this.returnUsersData.Data.cityIdUserAr;
            this.regionsIdUser = this.returnUsersData.Data.regionsIdUserAr;
          }
        }else{
          if (window.Intl && typeof window.Intl === 'object') {
            let Val  = navigator.language.split("-");
            if (Val[0])
              this.language = Val[0];
            else
              this.language = 'en';
            if(this.language == "en"){
              this.catIdPro = this.returnUsersData.Data.catIdEn;
              this.subCatIdPro = this.returnUsersData.Data.subCatIdEn;
              this.cityIdPro = this.returnUsersData.Data.cityIdEn;
              this.regionsIdPro = this.returnUsersData.Data.regionsIdEn;
              this.catIdUser = this.returnUsersData.Data.catIdUserEn;
              this.subCatIdUser = this.returnUsersData.Data.subCatIdUserEn;
              this.cityIdUser = this.returnUsersData.Data.cityIdUserEn;
              this.regionsIdUser = this.returnUsersData.Data.regionsIdUserEn;
            }
            else{
              this.catIdPro = this.returnUsersData.Data.catIdAr;
              this.subCatIdPro = this.returnUsersData.Data.subCatIdAr;
              this.cityIdPro = this.returnUsersData.Data.cityIdAr;
              this.regionsIdPro = this.returnUsersData.Data.regionsIdAr;
              this.catIdUser = this.returnUsersData.Data.catIdUserAr;
              this.subCatIdUser = this.returnUsersData.Data.subCatIdUserAr;
              this.cityIdUser = this.returnUsersData.Data.cityIdUserAr;
              this.regionsIdUser = this.returnUsersData.Data.regionsIdUserAr;
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
                this.catIdPro = this.returnUsersData.Data.catIdEn;
                this.subCatIdPro = this.returnUsersData.Data.subCatIdEn;
                this.cityIdPro = this.returnUsersData.Data.cityIdEn;
                this.regionsIdPro = this.returnUsersData.Data.regionsIdEn;
                this.catIdUser = this.returnUsersData.Data.catIdUserEn;
                this.subCatIdUser = this.returnUsersData.Data.subCatIdUserEn;
                this.cityIdUser = this.returnUsersData.Data.cityIdUserEn;
                this.regionsIdUser = this.returnUsersData.Data.regionsIdUserEn;
              }
              else{
                this.catIdPro = this.returnUsersData.Data.catIdAr;
                this.subCatIdPro = this.returnUsersData.Data.subCatIdAr;
                this.cityIdPro = this.returnUsersData.Data.cityIdAr;
                this.regionsIdPro = this.returnUsersData.Data.regionsIdAr;
                this.catIdUser = this.returnUsersData.Data.catIdUserAr;
                this.subCatIdUser = this.returnUsersData.Data.subCatIdUserAr;
                this.cityIdUser = this.returnUsersData.Data.cityIdUserAr;
                this.regionsIdUser = this.returnUsersData.Data.regionsIdUserAr;
              }
            }).catch(e => {console.log(e);});
          }
        }
        this.serviceDetailsPro = this.returnUsersData.Data.serviceDetails;
        this.imageType = 0;
        let checkValue = await this.isBookMark(servicesId);
        if(checkValue)
          this.imageType = 1;
      }
    }).catch(error=>{
      this.functionGetData(servicesId)
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catUserId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.userId == null || this.numberLogin == null  || this.fullName == null){
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
    this.activaterouter.params.subscribe((params:any) => {
      if(params['servicesId']!="" && params['servicesId']!=null && params['servicesId']!=undefined && params['servicesId']!=0)
        this.servicesId = params['servicesId'];
      if(params['pageNum']!="" && params['pageNum']!=null && params['pageNum']!=undefined && params['pageNum']!=0)
        this.pageNum = params['pageNum'];
    });
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
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
      this.displayResult(this.message);
    })
    this.functionGetData(this.servicesId);
    await this.notifications();
    await this.functionAddShow();
  }
  functionAddCall(){
    this.storesService.addCall(this.servicesId).then(async data=>{
    })
  }
  functionAddShow(){
    this.storesService.addShow(this.servicesId).then(async data=>{
    })
  }
  functionAddFav(){
    this.storesService.addFav(this.servicesId,1).then(async data=>{
    })
  }
  functionRemFav(){
    this.storesService.addFav(this.servicesId,2).then(async data=>{
    })
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      if(this.language == "en"){
        this.languageSelect = 2;
      }else{
        this.languageSelect = 1;
      }
      this.translate.use(this.language);
      this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0]){
          if(Val[0] == "en"){
            this.language = Val[0];
            this.languageSelect = 2;
          }else{
            this.language = Val[0];
            this.languageSelect = 1;
          }
        }
        else{
          this.language = 'en';
          this.languageSelect = 2;
        }
        this.translate.use(this.language);
        this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0]){
            if(Val[0] == "en"){
              this.language = Val[0];
              this.languageSelect = 2;
            }else{
              this.language = Val[0];
              this.languageSelect = 1;
            }
          }
          else{
            this.language = 'en';
            this.languageSelect = 2;
          }
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
  functionSendUser(){
    this.navCtrl.navigateRoot(['/sendpointuser', {servicesId:this.servicesId,userSelectId:this.usersIdService}])
  }
  evaluationUser(){
    this.navCtrl.navigateRoot(['/evaluationuser', {servicesId:this.servicesId,userSelectId:this.usersIdService}])
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
  functionGoToComplaints(){
    this.navCtrl.navigateRoot(['/complaints', {servicesId:this.servicesId,pageNum:this.pageNum,usersIdService:this.usersIdService}]);
  }
  functionGoToHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionGoInvitations(){
    this.navCtrl.navigateRoot("/invitations");
  }
  functionGoToSendPoint(){
    this.navCtrl.navigateRoot("/sendpoint");
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
  async showImage(image:any){
    let model = await this.modalController.create({
      component:ShowimageComponent,
      animated:true,
      componentProps:{image:image},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
    });
    await model.present();
  }
  whatsappSend(watsNum:any){
      let options: InAppBrowserOptions = {
        zoom: 'no'
      }
      let browser = this.inAppBrowser.create("https://api.whatsapp.com/send?phone="+watsNum,'_system',options);
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
  async bookMark(){
    return this.storage.get('bookMarks').then(bookmarks=>{
      if(bookmarks == null)
        bookmarks = new Array<any>();
      return bookmarks;
    });
  }
  isBookMark(userId:any){
    return this.bookMark().then(realVal=>{
      for(let i = 0;i < realVal.length;i++){
        if(realVal[i] == userId)
          return true;
      }
      return false;
    });
  }
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }
  async addBookMark(userId:any){
    await this.bookMark().then(async realVal=>{
      realVal.push(userId);
      await this.storage.set('bookMarks',realVal);
    });
  }
  async removeBookMark(userId:any){
    await this.bookMark().then(async realVal=>{
      const index = realVal.indexOf(userId);
      if (index > -1) {
        realVal.splice(index, 1);
      }
      this.imageType = 0;
      await this.storage.set('bookMarks',realVal);
    });
    await this.functionRemFav();
  }
  async saveBookMark(userId:any){
    await this.isBookMark(userId).then(async returnValue=>{
      if(!returnValue){
        await this.addBookMark(userId);
        this.imageType = 1;
      }
    });
    await this.functionAddFav();
  }
}
