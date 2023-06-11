import { Component, OnInit,ViewChild,ElementRef,Renderer2 } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import {StoresService} from "../../services/stores.service";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-evaluationuser',
  templateUrl: './evaluationuser.page.html',
  styleUrls: ['./evaluationuser.page.scss'],
})
export class EvaluationuserPage implements OnInit {
  @ViewChild('val11',{read:ElementRef}) val11:any;
  @ViewChild('val21',{read:ElementRef}) val21:any;
  @ViewChild('val31',{read:ElementRef}) val31:any;
  @ViewChild('val41',{read:ElementRef}) val41:any;
  @ViewChild('val51',{read:ElementRef}) val51:any;
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
  public returnProRateData:any;
  public returnArrayProRateFromServer:any;
  public returnProRateArray:any = [];
  public servicesId:any;
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
  public rate:any;
  public returnDataUser:any;
  public checkPointEnter:any;
  public numberSelectedStarOne:any=0;
  public evalDetails:any;
  public returnRateData:any;
  public commercialName:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public typeUserInfo:any;
  public userSelectId:any;
  public selectClassOne:any="categoriesHomeCardSelect";
  public selectClassTow:any="categoriesHomeCardUnSelect";
  public typeWork:any=1;
  public countOfAllRate:any;
  public rates:any;
  public noDataTitle:any;
  public noDataSubTitle:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public dirTow:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public evaluationuser:any;
  public serviceProvider:any;
  public evaluationPlacholder:any;
  public cancel:any;
  public evaluation:any;
  public evaluationSucsess:any;
  public evaluationField:any;
  public evaluationFieldTryAgain:any;
  public reviews:any;
  public starBackRat:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private storesService : StoresService,private renderer:Renderer2,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','home');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/home");
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
    this.translate.get('evaluationuser').subscribe((res: string) => {
      this.evaluationuser = res;
    });
    this.translate.get('serviceProvider').subscribe((res: string) => {
      this.serviceProvider = res;
    });
    this.translate.get('evaluationPlacholder').subscribe((res: string) => {
      this.evaluationPlacholder = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
    this.translate.get('evaluation').subscribe((res: string) => {
      this.evaluation = res;
    });
    this.translate.get('evaluationSucsess').subscribe((res: string) => {
      this.evaluationSucsess = res;
    });
    this.translate.get('evaluationField').subscribe((res: string) => {
      this.evaluationField = res;
    });
    this.translate.get('evaluationFieldTryAgain').subscribe((res: string) => {
      this.evaluationFieldTryAgain = res;
    });
    this.translate.get('reviews').subscribe((res: string) => {
      this.reviews = res;
    });
    this.translate.get('noDataTitle').subscribe((res: string) => {
      this.noDataTitle = res;
    });
    this.translate.get('noDataSubTitle').subscribe((res: string) => {
      this.noDataSubTitle = res;
    });
    this.translate.get('starBackRat').subscribe((res: string) => {
      this.starBackRat = res;
    });
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
  checkevalDetails(event:any){
    this.evalDetails = event.target.value;
    if(this.evalDetails == "" || this.evalDetails == undefined){
     this.evalDetails = "";
    }
  }
  functionNumRateStore(numStar:any,index:any) {
    if (index == 1) {
      if (numStar == 1) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106');
      }
      if (numStar == 2) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '#fbe106');
      }
      if (numStar == 3) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106')
        this.renderer.setStyle(this.val21.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '#fbe106');
      }
      if (numStar == 4) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106')
        this.renderer.setStyle(this.val21.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '#fbe106')
      }
      if (numStar == 5) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106')
        this.renderer.setStyle(this.val21.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '#fbe106')
        this.renderer.setStyle(this.val51.nativeElement, 'background', '#fbe106')
      }
      this.numberSelectedStarOne = numStar;
    }
  }
  async functionGetData(userId:any){
    this.storesService.userInformation(userId).then(async data=>{
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
      this.functionGetData(userId)
    });
  }
  async functionGetDataTow(servicesId:any){
    this.storesService.allRates(servicesId).then(async data=>{
      this.returnProRateData = data;
      this.operationResult = this.returnProRateData.Error.ErrorCode;
      if(this.operationResult==1) {
        this.countOfAllRate = this.returnProRateData.Data.countOfAllRate;
        this.returnArrayProRateFromServer = this.returnProRateData.Data.rates;
        this.returnProRateArray = [];
        for (let i = 0; i < this.returnArrayProRateFromServer.length; i++) {
          this.returnProRateArray[i]=[];
          this.returnProRateArray[i]['id'] = this.returnArrayProRateFromServer[i].id;
          this.returnProRateArray[i]['type'] = this.returnArrayProRateFromServer[i].type;
          if(this.returnProRateArray[i]['type'] == 1 || this.returnProRateArray[i]['type']==2){
            this.returnProRateArray[i]['image'] = this.returnArrayProRateFromServer[i].personalImage;
            if(this.returnProRateArray[i]['image']== null || this.returnProRateArray[i]['image'] == 0 || this.returnProRateArray[i]['image'] == undefined)
              this.returnProRateArray[i]['image'] = "../../assets/imgs/defTow.png";
            this.returnProRateArray[i]['fullName'] = this.returnArrayProRateFromServer[i].fullName;
          }else{
            this.returnProRateArray[i]['image'] = this.returnArrayProRateFromServer[i].accountImage;
            if(this.returnProRateArray[i]['image']== null || this.returnProRateArray[i]['image'] == 0 || this.returnProRateArray[i]['image'] == undefined)
              this.returnProRateArray[i]['image'] = "../../assets/imgs/defTow.png";
            this.returnProRateArray[i]['fullName'] = this.returnArrayProRateFromServer[i].commercialName;
          }
          this.returnProRateArray[i]['countOfRate'] = this.returnArrayProRateFromServer[i].countOfRate;
          this.returnProRateArray[i]['details'] = this.returnArrayProRateFromServer[i].details;
          this.returnProRateArray[i]['date'] = this.returnArrayProRateFromServer[i].date;
        }
        let countOfData = this.returnProRateArray.length;
        if(countOfData == 0)
          this.rates = 0;
        else{
          this.rates = 1;
        }
      }
    }).catch(error=>{
      this.functionGetDataTow(servicesId)
    });
  }
  async ngOnInit() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await loading.present();
    await this.getDeviceLanguage();
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.isActive = await this.storage.get('isActive');
    this.active = await this.storage.get('active');
    if(this.userId == null || this.numberLogin == null || this.type == null || this.type == null){
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
      if(params['userSelectId']!="" && params['userSelectId']!=null && params['userSelectId']!=undefined && params['userSelectId']!=0)
        this.userSelectId = params['userSelectId'];
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
    this.functionGetData(this.userSelectId);
    this.functionGetDataTow(this.servicesId);
    this.notifications();
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
  async saveAndBack(){
    if((this.evalDetails == undefined || this.evalDetails == "" || this.evalDetails == null) && this.numberSelectedStarOne == 0){
      this.message = this.evaluationField;
      this.displayResult(this.message);
    }else{
      this.storesService.rateServices(this.userId,this.servicesId,this.numberSelectedStarOne,this.evalDetails).then(data=>{
        this.returnRateData = data;
        this.operationResult = this.returnRateData.Error.ErrorCode;
        if(this.operationResult == 1){
          this.message = this.evaluationSucsess;
          this.displayResult(this.message);
        }else{
          this.message = this.evaluationField;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.evaluationFieldTryAgain;
        this.displayResult(this.message);
      })
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
  functionGoToServ(){
    this.navCtrl.navigateRoot(['/servicesdetalis', {servicesId:this.servicesId}])
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
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  functionOpenAccount(){
    this.navCtrl.navigateRoot("/account");
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
