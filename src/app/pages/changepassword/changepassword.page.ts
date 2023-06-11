import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  public operationResult:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public iconValues = "chevron-back-outline";
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
  public message:any;
  public userImage:any="../../assets/imgs/def.png";
  public oldPassword:any;
  public errorOldPassword:any="";
  public isErrorOldPassword:any = 1;
  public newPassword:any;
  public errorNewPassword:any="";
  public isErrorNewPassword:any = 1;
  public reNewPassword:any;
  public errorReNewPassword:any="";
  public isErrorReNewPassword:any = 1;
  public isdisabled:boolean=true;
  public showOldPassword: boolean = false;
  public showNewPassword: boolean = false;
  public showReNewPassword: boolean = false;
  errorRePasswordMsg:any="";
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;

  public changePass:any;
  public changePassOldPlacholder:any;
  public changePassOldError:any;
  public changePassNewPlacholder:any;
  public changePassNewError:any;
  public changePassReNewPlacholder:any;
  public change:any;
  public changeMsgOne:any;
  public changeMsgTow:any;
  public changeMsgThree:any;
  public changeMsgFor:any;
  public changeMsgFive:any;
  public changeMsgSix:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','changepassword');
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
    this.translate.get('changePass').subscribe((res: string) => {
      this.changePass = res;
    });
    this.translate.get('changePassOldPlacholder').subscribe((res: string) => {
      this.changePassOldPlacholder = res;
    });
    this.translate.get('changePassOldError').subscribe((res: string) => {
      this.changePassOldError = res;
    });
    this.translate.get('changePassOldError').subscribe((res: string) => {
      this.changePassOldError = res;
    });
    this.translate.get('changePassNewError').subscribe((res: string) => {
      this.changePassNewError = res;
    });
    this.translate.get('changePassReNewPlacholder').subscribe((res: string) => {
      this.changePassReNewPlacholder = res;
    });
    this.translate.get('change').subscribe((res: string) => {
      this.change = res;
    });
    this.translate.get('changeMsgOne').subscribe((res: string) => {
      this.changeMsgOne = res;
    });
    this.translate.get('changeMsgTow').subscribe((res: string) => {
      this.changeMsgTow = res;
    });
    this.translate.get('changeMsgThree').subscribe((res: string) => {
      this.changeMsgThree = res;
    });
    this.translate.get('changeMsgThree').subscribe((res: string) => {
      this.changeMsgThree = res;
    });
    this.translate.get('changeMsgFive').subscribe((res: string) => {
      this.changeMsgFive = res;
    });
    this.translate.get('changeMsgSix').subscribe((res: string) => {
      this.changeMsgSix = res;
    });
    this.translate.get('changePassNewPlacholder').subscribe((res: string) => {
      this.changePassNewPlacholder = res;
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
  checkOldPassword(event:any){
    this.errorOldPassword = "succsessFiled";
    this.isErrorOldPassword = 1;
    this.oldPassword = event.target.value;
    if(this.oldPassword == "" || this.oldPassword == undefined){
      this.errorOldPassword = "errorFiled";
      this.isErrorOldPassword = 0;
    }
    this.isEnterAllValues();
  }
  checkNewPassword(event:any){
    this.errorNewPassword = "succsessFiled";
    this.isErrorNewPassword = 1;
    this.newPassword = event.target.value;
    if(this.newPassword == "" || this.newPassword == undefined){
      this.errorNewPassword = "errorFiled";
      this.isErrorNewPassword = 0;
    }
    this.isEnterAllValues();
  }
  checkReNewPassword(event:any){
    this.errorReNewPassword = "succsessFiled";
    this.isErrorReNewPassword = 1;
    this.reNewPassword = event.target.value;
    if(this.reNewPassword == "" || this.reNewPassword == undefined){
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.oldPassword != undefined && this.oldPassword != "" && this.newPassword != undefined && this.newPassword != "" && this.reNewPassword != undefined && this.reNewPassword != ""){
      this.isdisabled = true;
    }
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 4000,
    });
    await loading.present();
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
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
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnData.Data.points;
        this.userImage = this.returnData.Data.image;
        if(this.userImage == null || this.userImage == 0 || this.userImage == undefined)
          this.userImage = "../../assets/imgs/def.png";
        await this.storage.set('image',this.userImage);
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
  changePassword(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','changepassword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });

    if((this.oldPassword == undefined || this.oldPassword == "") && (this.newPassword == undefined || this.newPassword == "") && (this.reNewPassword == undefined || this.reNewPassword == "")){
      this.errorOldPassword = "errorFiled";
      this.isErrorOldPassword = 0;
      this.errorNewPassword = "errorFiled";
      this.isErrorNewPassword = 0;
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
      this.errorRePasswordMsg = this.changeMsgOne;
      this.isdisabled = false;
      return false;
    }
    if(this.oldPassword == undefined || this.oldPassword == ""){
      this.errorOldPassword = "errorFiled";
      this.isErrorOldPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.newPassword == undefined || this.newPassword == ""){
      this.errorNewPassword = "errorFiled";
      this.isErrorNewPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.reNewPassword == undefined || this.reNewPassword == ""){
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
      this.errorRePasswordMsg = this.changeMsgOne;
      this.isdisabled = false;
      return false;
    }
    if(this.newPassword != this.reNewPassword){
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
      this.errorRePasswordMsg = this.changeMsgTow;
      this.isdisabled = false;
      return false;
    }
    if(this.oldPassword != undefined && this.newPassword != undefined && this.reNewPassword != undefined){
      this.usersService.changePassword(this.userId,this.oldPassword,this.newPassword).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = this.changeMsgThree;
          this.displayResult(this.message);
        }else if(this.operationResult==2){
          this.message = this.changeMsgFor;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.changeMsgFive;
          this.displayResult(this.message);
        }else{
          this.message = this.changeMsgSix;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.changeMsgSix;
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
    return true;
  }
  changeOldInputType(){
    this.showOldPassword = !this.showOldPassword;
  }
  changeNewInputType(){
    this.showNewPassword = !this.showNewPassword;
  }
  changeReNewInputType(){
    this.showReNewPassword = !this.showReNewPassword;
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
