import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
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
@Component({
  selector: 'app-getsubcatproorser',
  templateUrl: './getsubcatproorser.page.html',
  styleUrls: ['./getsubcatproorser.page.scss'],
})
export class GetsubcatproorserPage implements OnInit {
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catUserId:any;
  public points:any;
  public type:any;
  public email:any;
  public operationResult:any;
  public returnUsersData:any;
  public returnDataUser:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public cardBalance:any;
  public message:any;
  public arrowSide:any;
  public returnCategoriesData:any;
  public returnArrayCategoriesFromServer:any;
  public returnCategoriesArray:any = [];
  public categories:any
  public selectCatId:any
  public selectCatName:any;
  public servicesId:any;
  public pageNum:any;
  public usersIdService:any;
  public typeOp:any;
  public catOp:any;
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
  public floatTow:any;
  public problemReport:any;
  public specifyProblem:any;
  public arrowSideTow:any
  public maintenanceServices:any;
  public products:any;
  public exchangeForPoints:any;
  public addSubCatProduct:any;
  public addSubCatServeces:any;
  public searchCatProdPlaceHolder:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private callNumber: CallNumber,private storesService : StoresService,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','mypage');
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
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('floatTow').subscribe((res: string) => {
      this.floatTow = res;
    });
    this.translate.get('swap').subscribe((res: string) => {
      this.swap = res;
    });
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dirTow = res;
    });
    this.translate.get('arrowSide').subscribe((res: string) => {
      this.arrowSide = res;
    });
    this.translate.get('arrowSideTow').subscribe((res: string) => {
      this.arrowSideTow = res;
    });
    this.translate.get('problemReport').subscribe((res: string) => {
      this.problemReport = res;
    });
    this.translate.get('specifyProblem').subscribe((res: string) => {
      this.specifyProblem = res;
    });
    this.translate.get('maintenanceServices').subscribe((res: string) => {
      this.maintenanceServices = res;
    });
    this.translate.get('products').subscribe((res: string) => {
      this.products = res;
    });
    this.translate.get('exchangeForPoints').subscribe((res: string) => {
      this.exchangeForPoints = res;
    });
    this.translate.get('addSubCatProduct').subscribe((res: string) => {
      this.addSubCatProduct = res;
    });
    this.translate.get('addSubCatServeces').subscribe((res: string) => {
      this.addSubCatServeces = res;
    });
    this.translate.get('searchCatProdPlaceHolder').subscribe((res: string) => {
      this.searchCatProdPlaceHolder = res;
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
  async functionGetData(catOp:any,search:any=0){
    this.categoriesService.productsSubCat(catOp,search).then(data=>{
      this.returnCategoriesData = data;
      this.operationResult = this.returnCategoriesData.Error.ErrorCode;
      this.returnCategoriesArray=[];
      if(this.operationResult==1){
        this.returnArrayCategoriesFromServer = this.returnCategoriesData.Data.subCat;
        for(let i = 0; i < this.returnArrayCategoriesFromServer.length;i++) {
          this.returnCategoriesArray[i]=[];
          this.returnCategoriesArray[i]['id'] = this.returnArrayCategoriesFromServer[i].id;
          this.returnCategoriesArray[i]['class'] = "boxComplaints";
          if(this.checkLanguage){
            if(this.language == "en")
              this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
            else
              this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if(this.language == "en")
                this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
              else
                this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if(this.language == "en")
                  this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
                else
                  this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
              }).catch(e => {console.log(e);});
            }
          }
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
    })
    this.activaterouter.params.subscribe((params:any) => {
      if(params['type']!="" && params['type']!=null && params['type']!=undefined && params['type']!=0)
        this.typeOp = params['type'];
      if(params['catId']!="" && params['catId']!=null && params['catId']!=undefined && params['catId']!=0)
        this.catOp = params['catId'];
    });
    await this.functionGetData(this.catOp)
    await this.notifications();
  }
  async checkUserSearch(event:any){
    await this.functionGetData(this.catOp,event.target.value)
  }
  selectCat(index:any,catId:any,name:any){
    for(let i = 0; i < this.returnCategoriesArray.length;i++) {
      this.returnCategoriesArray[i]['class'] = "boxComplaints";
    }
    this.selectCatId = catId;
    this.selectCatName = name;
    this.returnCategoriesArray[index]['class'] = "boxComplaintsLight";
    this.navCtrl.navigateRoot(['/productsadd', {subCatId:this.selectCatId,catId:this.catOp,type:this.typeOp}])

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
  functionGoBack(){
    this.navCtrl.navigateRoot(['/getcatproorser', {type:this.typeOp}]);
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
