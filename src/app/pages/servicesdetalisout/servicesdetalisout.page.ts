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
@Component({
  selector: 'app-servicesdetalisout',
  templateUrl: './servicesdetalisout.page.html',
  styleUrls: ['./servicesdetalisout.page.scss'],
})
export class ServicesdetalisoutPage implements OnInit {
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
  public detailsNote:any;
  public problemReport:any;
  public calling:any;
  public sendMsg:any;
  public details:any;
  public serviceDetailsdTitle:any;
  constructor(private modalController: ModalController,private globalization: Globalization, private translate: TranslateService,private callNumber: CallNumber,private storesService : StoresService,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
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
    this.translate.get('serviceDetailsdTitle').subscribe((res: string) => {
      this.serviceDetailsdTitle = res;
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
      }
    }).catch(error=>{
      this.functionGetData(servicesId)
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.functionAddShow();
    this.activaterouter.params.subscribe((params:any) => {
      if(params['servicesId']!="" && params['servicesId']!=null && params['servicesId']!=undefined && params['servicesId']!=0)
        this.servicesId = params['servicesId'];
      if(params['pageNum']!="" && params['pageNum']!=null && params['pageNum']!=undefined && params['pageNum']!=0)
        this.pageNum = params['pageNum'];
    });
    this.functionGetData(this.servicesId);
  }
  functionAddShow(){
    this.storesService.addShow(this.servicesId).then(async data=>{
    })
  }
  functionAddCall(){
    this.storesService.addCall(this.servicesId).then(async data=>{
    })
  }
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
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
