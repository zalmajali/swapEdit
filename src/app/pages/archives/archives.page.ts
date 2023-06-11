import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import {StoresService} from "../../services/stores.service";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-archives',
  templateUrl: './archives.page.html',
  styleUrls: ['./archives.page.scss'],
})
export class ArchivesPage implements OnInit {
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catUserId:any;
  public points:any;
  public type:any;
  public email:any;
  public message:any;
  public operationResult:any;
  public returnPointsData:any;
  public returnArrayPointsFromServer:any;
  public returnPointsArray:any = [];
  public dataArch:any;
  public returnDataUser:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public noDataTitle:any;
  public noDataSubTitle:any;
  public itWas:any;
  public transactionNumber:any;
  public mobileNumber:any;
  public bonusAllowance:any;
  public receive:any;
  public from:any;
  public to:any;
  public send:any;

  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private storesService : StoresService,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','archives');
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
    this.translate.get('noDataTitle').subscribe((res: string) => {
      this.noDataTitle = res;
    });
    this.translate.get('noDataSubTitle').subscribe((res: string) => {
      this.noDataSubTitle = res;
    });

    this.translate.get('itWas').subscribe((res: string) => {
      this.itWas = res;
    });
    this.translate.get('transactionNumber').subscribe((res: string) => {
      this.transactionNumber = res;
    });
    this.translate.get('mobileNumber').subscribe((res: string) => {
      this.mobileNumber = res;
    });
    this.translate.get('bonusAllowance').subscribe((res: string) => {
      this.bonusAllowance = res;
    });
    this.translate.get('receive').subscribe((res: string) => {
      this.receive = res;
    });
    this.translate.get('from').subscribe((res: string) => {
      this.from = res;
    });
    this.translate.get('to').subscribe((res: string) => {
      this.to = res;
    });
    this.translate.get('send').subscribe((res: string) => {
      this.send = res;
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
  async functionGetData(userId:any){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await loading.present();
    this.storesService.pointsArchives(userId).then(async data=>{
      this.returnPointsData = data;
      this.operationResult = this.returnPointsData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayPointsFromServer = this.returnPointsData.Data.points;
        this.returnPointsArray=[];
        for(let i = 0; i < this.returnArrayPointsFromServer.length;i++) {
          this.returnPointsArray[i]=[];
          this.returnPointsArray[i]['id'] = this.returnArrayPointsFromServer[i].id;
          this.returnPointsArray[i]['points'] = this.returnArrayPointsFromServer[i].points;
          this.returnPointsArray[i]['date'] = this.returnArrayPointsFromServer[i].date;
          this.returnPointsArray[i]['msgFromAdmin'] = "";
          if(this.returnArrayPointsFromServer[i].sentUserId == 1)
          this.returnPointsArray[i]['msgFromAdmin'] = this.bonusAllowance;
          this.returnPointsArray[i]['type'] = this.receive;
          this.returnPointsArray[i]['to'] = this.from;
          this.returnPointsArray[i]['toUser'] = this.returnArrayPointsFromServer[i].sentUserName;
          this.returnPointsArray[i]['toMobile'] = this.returnArrayPointsFromServer[i].sentUsermobile;
          if(this.returnArrayPointsFromServer[i].type==2){
            this.returnPointsArray[i]['to'] = this.to;
            this.returnPointsArray[i]['type'] = this.send;
            this.returnPointsArray[i]['toUser'] = this.returnArrayPointsFromServer[i].resUserName;
            this.returnPointsArray[i]['toMobile'] = this.returnArrayPointsFromServer[i].resUsermobile;
          }
          this.returnPointsArray[i]['sendexistUser'] = this.returnArrayPointsFromServer[i].sendexistUser;
          this.returnPointsArray[i]['sentUserName'] = this.returnArrayPointsFromServer[i].sentUserName;
          this.returnPointsArray[i]['sentUsermobile'] = this.returnArrayPointsFromServer[i].sentUsermobile;
          this.returnPointsArray[i]['reseexistUser'] = this.returnArrayPointsFromServer[i].reseexistUser;
          this.returnPointsArray[i]['resUsermobile'] = this.returnArrayPointsFromServer[i].resUsermobile;
          this.returnPointsArray[i]['resUserName'] = this.returnArrayPointsFromServer[i].resUserName;
        }
        let countOfData = this.returnPointsArray.length;
        if(countOfData == 0)
          this.dataArch = 0;
        else{
          this.dataArch = 1;
        }
      }else
        this.dataArch = 0;
    }).catch(error=>{
      this.functionGetData(userId)
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
    this.notifications();
    this.functionGetData(this.userId)
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
