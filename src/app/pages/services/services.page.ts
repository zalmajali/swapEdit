import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController,ModalController, Platform, ToastController} from "@ionic/angular";
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
import {ServicesfilterComponent} from "../servicesfilter/servicesfilter.component";
@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll | any;
  public questions:any=0;
  public catId:any;
  public catName:any;
  public loopingNumber:any = 1;
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
  public allFaveUserId:any;
  public returnDataUser:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public catIdUser:any;
  public subCatIdUser:any;
  public cityId:any;
  public regionId:any;
  public pointFrom:any;
  public pointTo:any;
  public servesName:any;
  public servesDetalis:any;

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
  public noDataTitle:any;
  public noDataSubTitle:any;
  public services:any;
  public detailsNote:any;
  public arrowSide:any;
  public servesNamePlaceHolder:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private callNumber: CallNumber,private storesService : StoresService,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
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
    this.translate.get('noDataTitle').subscribe((res: string) => {
      this.noDataTitle = res;
    });
    this.translate.get('noDataSubTitle').subscribe((res: string) => {
      this.noDataSubTitle = res;
    });
    this.translate.get('services').subscribe((res: string) => {
      this.services = res;
    });
    this.translate.get('floatTow').subscribe((res: string) => {
      this.floatTow = res;
    });
    this.translate.get('detailsNote').subscribe((res: string) => {
      this.detailsNote = res;
    });
    this.translate.get('arrowSideTow').subscribe((res: string) => {
      this.arrowSide = res;
    });
    this.translate.get('servesNamePlaceHolder').subscribe((res: string) => {
      this.servesNamePlaceHolder = res;
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
       .then(res =>{})
       .catch(err =>{
         this.message = this.detailsNote;
         this.displayResult(this.message);
       });
   }
  async functionGetData(userId:any,catId:any,subCatIdUser:any=0,cityId:any=0,regionId:any=0,pointFrom:any=0,pointTo:any=0,servesName:any=0){
    let limitNew = this.loopingNumber;
    if(servesName == "")
      servesName = 0
    this.storesService.allServices(userId,catId,subCatIdUser,cityId,regionId,pointFrom,pointTo,servesName,limitNew).then(async data=>{
      await this.storage.get('checkLanguage').then(async checkLanguage=>{
        this.checkLanguage = checkLanguage
      });
      this.returnUsersData = data;
      this.operationResult = this.returnUsersData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayUsersFromServer = this.returnUsersData.Data.products;
        this.countOfData = this.returnUsersData.Data.countOfData;
        this.returnUsersArray=[];
        for(let i = 0; i < this.returnArrayUsersFromServer.length;i++) {
          this.returnUsersArray[i]=[];
          this.returnUsersArray[i]['id'] = this.returnArrayUsersFromServer[i].id;
          this.returnUsersArray[i]['mobile'] = this.returnArrayUsersFromServer[i].mobile;
          this.returnUsersArray[i]['userId'] = this.returnArrayUsersFromServer[i].userId;
          this.returnUsersArray[i]['mobileHide'] = this.returnArrayUsersFromServer[i].mobileHide;
          this.returnUsersArray[i]['title'] = this.returnArrayUsersFromServer[i].title;
          this.returnUsersArray[i]['points'] = this.returnArrayUsersFromServer[i].points;
          if(this.returnUsersArray[i]['type'] == 1 || this.returnUsersArray[i]['type']==2){
            this.returnUsersArray[i]['commercialName'] = this.returnArrayUsersFromServer[i].fullName;
          }else{
            this.returnUsersArray[i]['commercialName'] = this.returnArrayUsersFromServer[i].commercialName;
          }
          this.returnUsersArray[i]['productsImage'] = this.returnArrayUsersFromServer[i].productsImage;
          if(this.returnArrayUsersFromServer[i].productsImage == null || this.returnArrayUsersFromServer[i].productsImage == 0 || this.returnArrayUsersFromServer[i].productsImage == undefined)
            this.returnUsersArray[i]['productsImage'] = "../../assets/imgs/defThree.png";
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en"){
              this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_en;
              this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_en;
              this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_en;
            }
            else{
              this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_ar;
              this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_ar;
              this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_ar;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en"){
                this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_en;
                this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_en;
                this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_en;
              }
              else{
                this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_ar;
                this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_ar;
                this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_ar;
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
                  this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_en;
                  this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_en;
                  this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_en;
                }
                else{
                  this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_ar;
                  this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_ar;
                  this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
          this.returnUsersArray[i]['rate'] = this.returnArrayUsersFromServer[i].rate;
          this.returnUsersArray[i]['imageType'] = 0;
          let checkValue = await this.isBookMark(this.returnArrayUsersFromServer[i].id);
          if(checkValue)
            this.returnUsersArray[i]['imageType'] = 1;
        }
        let countOfData = this.returnUsersArray.length;
        if(countOfData == 0)
          this.users = 0;
        else{
          this.users = 1;
        }
      }else
        this.users = 0;
    }).catch(error=>{
      this.functionGetData(userId,catId,subCatIdUser,cityId,regionId,pointFrom,pointTo,servesName)
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
      this.catUserId = await this.storage.get('catId');
      this.points = await this.storage.get('points');
      this.type = await this.storage.get('type');
      this.email = await this.storage.get('email');
      if(this.userId == null || this.numberLogin == null || this.fullName == null){
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
        if(params['catId']!="" && params['catId']!=null && params['catId']!=undefined && params['catId']!=0)
          this.catId = params['catId'];
        if(params['catName']!="" && params['catName']!=null && params['catName']!=undefined && params['catName']!=0)
          this.catName = params['catName'];
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
    this.functionGetData(this.userId,this.catId)
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
  async servicesFilter(){
    let model = await this.modalController.create({
      component:ServicesfilterComponent,
      animated:true,
      componentProps:{catSelectId:this.catId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
      this.catIdUser = data.data.catIdUser;
      this.subCatIdUser = data.data.subCatIdUser;
      this.cityId = data.data.cityId;
      this.regionId = data.data.regionId;
      this.pointFrom = data.data.pointFrom;
      this.pointTo = data.data.pointTo;
      if(this.subCatIdUser == null || this.subCatIdUser == 0  || this.subCatIdUser == "")
        this.subCatIdUser = 0;
      if(this.cityId == null || this.cityId == 0  || this.cityId == "")
        this.cityId = 0;
      if(this.regionId == null || this.regionId == 0  || this.regionId == "")
        this.regionId = 0;
      if(this.pointFrom == null || this.pointFrom == 0  || this.pointFrom == "")
        this.pointFrom = 0;
      if(this.pointTo == null || this.pointTo == 0  || this.pointTo == "")
        this.pointTo = 0;
      if(this.subCatIdUser!=0 || this.cityId!=0 || this.regionId!=0 || this.pointFrom!=0 || this.pointTo!=0)
        this.functionGetData(this.userId,this.catId,this.subCatIdUser,this.cityId,this.regionId,this.pointFrom,this.pointTo,this.servesName)
    });
    await model.present();
  }
  evaluationUser(servicesId:any,userId:any){
    this.navCtrl.navigateRoot(['/evaluationuser', {servicesId:servicesId,userSelectId:userId}])
  }
  functionUserDetalis(userId:any){
    this.navCtrl.navigateRoot(['/servicesdetalis', {servicesId:userId,pageNum:1}])
  }
  checkServesName(event:any){
    this.servesName = event.target.value;
    this.functionGetData(this.userId,this.catId,this.subCatIdUser,this.cityId,this.regionId,this.pointFrom,this.pointTo,this.servesName)
  }
  loadMoreData(event:any) {
    this.loopingNumber++;
    setTimeout(() => {
      this.functionGetData(this.userId,this.catId,this.subCatIdUser,this.cityId,this.regionId,this.pointFrom,this.pointTo,this.servesName)
      event.target.complete();
      if (this.loopingNumber >= this.countOfData) {
        event.target.disabled = true;
      }
    }, 2000);
  }
  refrechAllPage(event:any) {
    this.loopingNumber = 1;
    this.functionGetData(this.userId,this.catId,this.subCatIdUser,this.cityId,this.regionId,this.pointFrom,this.pointTo,this.servesName)
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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
  functionAddFav(servicesId:any){
    this.storesService.addFav(servicesId,1).then(async data=>{
    })
  }
  functionRemFav(servicesId:any){
    this.storesService.addFav(servicesId,2).then(async data=>{
    })
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
  async addBookMark(userId:any){
    await this.bookMark().then(async realVal=>{
      realVal.push(userId);
      await this.storage.set('bookMarks',realVal);
    });
  }
 async removeBookMark(userId:any,indexVal:any){
    await this.bookMark().then(async realVal=>{
      const index = realVal.indexOf(userId);
      if (index > -1) {
        realVal.splice(index, 1);
      }
      this.returnUsersArray[indexVal]['imageType'] = 0;
      await this.storage.set('bookMarks',realVal);
    });
   await this.functionRemFav(userId);
  }
  async saveBookMark(userId:any,index:any){
    await this.isBookMark(userId).then(async returnValue=>{
      if(!returnValue){
        await this.addBookMark(userId);
        this.returnUsersArray[index]['imageType'] = 1;
      }
    });
    await this.functionAddFav(userId);
  }

}
