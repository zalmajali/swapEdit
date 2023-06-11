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
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {
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
  public next:any;
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
    this.translate.get('problemReport').subscribe((res: string) => {
      this.problemReport = res;
    });
    this.translate.get('specifyProblem').subscribe((res: string) => {
      this.specifyProblem = res;
    });
    this.translate.get('next').subscribe((res: string) => {
      this.next = res;
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
      if(params['usersIdService']!="" && params['servicesId']!=null && params['servicesId']!=undefined && params['servicesId']!=0)
        this.servicesId = params['servicesId'];

      if(params['usersIdService']!="" && params['usersIdService']!=null && params['usersIdService']!=undefined && params['usersIdService']!=0)
        this.usersIdService = params['usersIdService'];

      if(params['pageNum']!="" && params['pageNum']!=null && params['pageNum']!=undefined && params['pageNum']!=0)
        this.pageNum = params['pageNum'];
    });
    this.categoriesService.complaintsCategories().then(data=>{
      this.returnCategoriesData = data;
      this.operationResult = this.returnCategoriesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCategoriesFromServer = this.returnCategoriesData.Data.complaintsCategories;
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
    this.notifications();
  }
  selectCat(index:any,catId:any,name:any){
    for(let i = 0; i < this.returnCategoriesArray.length;i++) {
      this.returnCategoriesArray[i]['class'] = "boxComplaints";
    }
    this.selectCatId = catId;
    this.selectCatName = name;
    this.returnCategoriesArray[index]['class'] = "boxComplaintsLight";
  }
  complaintsAdd(){
    this.navCtrl.navigateRoot(['/complaintsadd', {servicesId:this.servicesId,pageNum:this.pageNum,selectCatId:this.selectCatId,selectCatName:this.selectCatName,usersIdService:this.usersIdService}])
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
  backServicesdetalis(){
    this.navCtrl.navigateRoot(['/servicesdetalis', {servicesId:this.servicesId,pageNum:this.pageNum}])
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
