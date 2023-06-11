import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {CountriesComponent} from "../countries/countries.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public number:any;
  public errorNumber:any="";
  public isErrorNumber:any = 1;
  public password:any;
  public errorPassword:any="";
  public isErrorPassword:any = 1;
  public isdisabled:boolean=true;
  public backToPage:any;
  public returnData:any;
  public operationResult:any;
  public message:any;
  public loadingShow:any = 0;
  public returnFullName:any;
  public returnNumber:any;
  public showPassword: boolean = false;
  public showLoginWithApple:any = 0;
  public facebookToken:any;
  public facebookUserId:any;
  public result:any;
  public firstTime:any;
  public lastTime:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public productInShopingCart:any;
  public loginOk:any=0;
  public key: any="962";
  public countryId: any="962";
  public image: any="../../assets/imgs/jo.png";
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public formTitleLogin:any;
  public placeHolderLoginNumber:any;
  public errorLoginNumber:any;
  public placeHolderLoginPassword:any;
  public errorLoginPassword:any;
  public forgotPassword:any;
  public login:any;
  public createAccount:any;
  public or:any;
  public sorryStopApp:any;
  public sorryLoginAppOne:any;
  public sorryLoginAppTow:any;
  public sorryLoginAppThree:any;
  public sorryLoginAppFor:any;
  public sorryLoginAppFive:any;
  public sorryLoginAppsix:any;
  public sorryLoginAppSevin:any;
  public classCopyCode:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private http:HttpClient,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/login");
    });
  }
  async selectCountries(type:any=1){
    let model = await this.modalController.create({
      component:CountriesComponent,
      animated:true,
      componentProps:{opera:type},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
      if(data.data.key!=undefined && data.data.key!=0 && data.data.key!=null){
        this.key = data.data.key;
        this.image = data.data.image;
        this.countryId = data.data.id;
      }
    });
    await model.present();
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('formTitleLogin').subscribe((res: string) => {
      this.formTitleLogin = res;
    });
    this.translate.get('placeHolderLoginNumber').subscribe((res: string) => {
      this.placeHolderLoginNumber = res;
    });
    this.translate.get('errorLoginNumber').subscribe((res: string) => {
      this.errorLoginNumber = res;
    });
    this.translate.get('placeHolderLoginPassword').subscribe((res: string) => {
      this.placeHolderLoginPassword = res;
    });
    this.translate.get('errorLoginPassword').subscribe((res: string) => {
      this.errorLoginPassword = res;
    });
    this.translate.get('forgotPassword').subscribe((res: string) => {
      this.forgotPassword = res;
    });
    this.translate.get('login').subscribe((res: string) => {
      this.login = res;
    });
    this.translate.get('createAccount').subscribe((res: string) => {
      this.createAccount = res;
    });
    this.translate.get('or').subscribe((res: string) => {
      this.or = res;
    });
    this.translate.get('sorryStopApp').subscribe((res: string) => {
      this.sorryStopApp = res;
    });
    this.translate.get('sorryLoginAppOne').subscribe((res: string) => {
      this.sorryLoginAppOne = res;
    });
    this.translate.get('sorryLoginAppTow').subscribe((res: string) => {
      this.sorryLoginAppTow = res;
    });
    this.translate.get('sorryLoginAppThree').subscribe((res: string) => {
      this.sorryLoginAppThree = res;
    });
    this.translate.get('sorryLoginAppFor').subscribe((res: string) => {
      this.sorryLoginAppFor = res;
    });
    this.translate.get('sorryLoginAppFive').subscribe((res: string) => {
      this.sorryLoginAppFive = res;
    });
    this.translate.get('sorryLoginAppsix').subscribe((res: string) => {
      this.sorryLoginAppsix = res;
    });
    this.translate.get('sorryLoginAppSevin').subscribe((res: string) => {
      this.sorryLoginAppSevin = res;
    });
    this.translate.get('classCopyCode').subscribe((res: string) => {
      this.classCopyCode = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.storage.remove('fullNameLogin');
    this.storage.remove('numberLogin');
    this.storage.remove('passwordLogin');
    this.storage.remove('type');
    this.storage.remove('userId');
    this.storage.remove('catId');
    this.storage.remove('subCatId');
    this.storage.remove('points');
    this.storage.remove('isActive');
    this.storage.remove('active');
    this.storage.remove('image');
    this.storage.remove('invitationCode');
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    await this.storage.set('internetBack','1');
    await this.checkIfLogin();
    await this.checkIfSiteWork();
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
  checkNumber(event:any){
    this.errorNumber = "succsessFiled";
    this.isErrorNumber = 1;
    this.number = event.target.value;
    if(this.number == "" || this.number == undefined){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
    }
    this.isEnterAllValues();
  }
  checkPassword(event:any){
    this.errorPassword = "succsessFiled";
    this.isErrorPassword = 1;
    this.password = event.target.value;
    if(this.password == "" || this.password == undefined){
      this.errorPassword = "errorFiled";
      this.isErrorPassword = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.number != undefined && this.number != "" && this.password != undefined && this.password != ""){
      this.isdisabled = true;
    }
  }
  async checkIfLogin(){
    this.usersService.checkIfLoginApi().then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult!=1){
        this.storage.remove('fullNameLogin');
        this.storage.remove('numberLogin');
        this.storage.remove('passwordLogin');
        this.storage.remove('type');
        this.storage.remove('userId');
        this.storage.remove('catId');
        this.storage.remove('subCatId');
        this.storage.remove('points');
        this.message = this.sorryStopApp;
        this.displayResult(this.message);
      }else{
        this.loginOk = 1;
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
      this.message = this.sorryStopApp;
      this.displayResult(this.message);
    })
  }
  async checkUser(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.loginOk == 0){
      this.message = this.sorryStopApp;
      this.displayResult(this.message);
      return false;
    }
    if((this.number == undefined || this.number == "") && (this.password == undefined || this.password == "")){
      this.errorNumber = "errorFiled";
      this.errorPassword = "errorFiled";
      this.isErrorNumber = 0;
      this.isErrorPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.number == undefined || this.number == ""){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.password == undefined || this.password == ""){
      this.errorPassword = "errorFiled";
      this.isErrorPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.number != undefined && this.password != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      await loading.present();
      this.usersService.checkUser(this.number,this.password,this.key).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          await this.storage.set('fullNameLogin',this.returnData.Data.name);
          await this.storage.set('numberLogin',this.number);
          await this.storage.set('passwordLogin',this.password);
          await this.storage.set('type',this.returnData.Data.type);
          await this.storage.set('userId',this.returnData.Data.id);
          await this.storage.set('catId',this.returnData.Data.catId);
          await this.storage.set('subCatId',this.returnData.Data.subCatId);
          await this.storage.set('points',this.returnData.Data.points);
          await this.storage.set('isActive',this.returnData.Data.is_active);
          await this.storage.set('active',this.returnData.Data.active);
          await this.storage.set('image',this.returnData.Data.image);
          await this.storage.set('accountImage',this.returnData.Data.accountImage);
          await this.storage.set('invitationCode',this.returnData.Data.invitationCode);
          await this.storage.set('isaddInformation',1);
          await this.storage.set('countryId',this.countryId);
          if(this.returnData.Data.type == 1){
            this.navCtrl.navigateRoot("/home");
          }else{
            if(this.returnData.Data.isProducts == 1){
              this.navCtrl.navigateRoot("/home");
            }else{
              this.navCtrl.navigateRoot("/noproducts");
            }
          }
        }else if(this.operationResult==2){
          this.message = this.sorryLoginAppOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.sorryLoginAppSevin;
          this.displayResult(this.message);
        }else if(this.operationResult==4){
          await this.storage.set('countryId',this.countryId);
          await this.storage.set('userId',this.returnData.Data.id);
          this.message = this.sorryLoginAppTow;
          this.displayResult(this.message);
          this.navCtrl.navigateRoot("/activation");
        }else if(this.operationResult==5){
          await this.storage.set('numberLogin',this.number);
          await this.storage.set('passwordLogin',this.password);
          await this.storage.set('countryId',this.countryId);
          await this.storage.set('userId',this.returnData.Data.id);
          this.message = this.sorryLoginAppFor;
          this.displayResult(this.message);
          this.navCtrl.navigateRoot("/usertype");//new page
        }else if(this.operationResult==6){
         await this.storage.set('fullNameLogin',this.returnData.Data.name);
          await this.storage.set('numberLogin',this.number);
          await this.storage.set('passwordLogin',this.password);
          await this.storage.set('type',this.returnData.Data.type);
          await this.storage.set('userId',this.returnData.Data.id);
          await this.storage.set('catId',this.returnData.Data.catId);
          await this.storage.set('subCatId',this.returnData.Data.subCatId);
          await this.storage.set('points',this.returnData.Data.points);
          await this.storage.set('isActive',this.returnData.Data.is_active);
          await this.storage.set('active',this.returnData.Data.active);
          await this.storage.set('image',this.returnData.Data.image);
          await this.storage.set('invitationCode',this.returnData.Data.invitationCode);
          await this.storage.set('countryId',this.countryId);
          this.message = this.sorryLoginAppFive;
          this.displayResult(this.message);
          this.navCtrl.navigateRoot("/awaitingapproval");
        }else if(this.operationResult==7){
          this.message = this.sorryLoginAppThree;
          this.displayResult(this.message);
        }else{
          this.message = this.sorryLoginAppsix;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message =this.sorryLoginAppSevin;
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
    return true;
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
  forgotPasssword(){
    this.navCtrl.navigateRoot("/forgotpasssword");
  }
  functionGoRegistration(){
    this.navCtrl.navigateRoot("/registration");
  }
  changeInputType(){
    this.showPassword = !this.showPassword;
  }
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
