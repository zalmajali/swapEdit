import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController,ModalController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {HttpClient} from "@angular/common/http";
import {PolicycompComponent} from "../policycomp/policycomp.component";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {CountriesComponent} from "../countries/countries.component";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public number:any;
  public  errorNumber:any="";
  public isErrorNumber:any = 1;
  public invitation:any;
  errorInvitation:any="";
  isErrorInvitation:any = 1;
  public password:any;
  public errorPassword:any="";
  public isErrorPassword:any = 1;
  public rePassword:any;
  public errorRePassword:any="";
  public errorRePasswordMsg:any="";
  public isErrorRePassword:any = 1;

  public isdisabled:boolean=true;
  public backToPage:any;
  public returnData:any;
  public operationResult:any;
  public message:any;
  public returnFullName:any;
  public returnNumber:any;
  public showPassword: boolean = false;
  public showPasswordRe: boolean = false;
  public showLoginWithApple:any = 0;
  public facebookToken:any;
  public facebookUserId:any;
  public result:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public productInShopingCart:any;
  public checkPlicy:any=0;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public createAccount: any;
  public createNewAccount: any;
  public placeHolderRegNumber: any;
  public errorRegNumber: any;
  public placeHolderRegPassword: any;
  public errorRegPassword: any;
  public placeHolderRegRePassword: any;
  public errorRegRePassword: any;
  public invitationCode: any;
  public usageAgreement: any;
  public confirmationPassword: any;
  public confirmationReAndPassword: any;
  public usageAgreementCon: any;
  public sorryRegAppOne: any;
  public sorryRegAppTow: any;
  public sorryRegAppThree: any;
  public sorryRegAppFor: any;
  public sorryRegAppFive: any;
  public sorryRegAppsix: any;
  public key: any="962";
  public countryId: any="962";
  public image: any="../../assets/imgs/jo.png";
  public classCopyCode:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private http:HttpClient,private network:Network,private modalController: ModalController,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    })
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
    this.translate.get('createAccount').subscribe((res: string) => {
      this.createAccount = res;
    });
    this.translate.get('createNewAccount').subscribe((res: string) => {
      this.createNewAccount = res;
    });
    this.translate.get('placeHolderRegNumber').subscribe((res: string) => {
      this.placeHolderRegNumber = res;
    });
    this.translate.get('errorRegNumber').subscribe((res: string) => {
      this.errorRegNumber = res;
    });
    this.translate.get('placeHolderRegPassword').subscribe((res: string) => {
      this.placeHolderRegPassword = res;
    });
    this.translate.get('errorRegPassword').subscribe((res: string) => {
      this.errorRegPassword = res;
    });
    this.translate.get('placeHolderRegRePassword').subscribe((res: string) => {
      this.placeHolderRegRePassword = res;
    });
    this.translate.get('errorRegRePassword').subscribe((res: string) => {
      this.errorRegRePassword = res;
    });
    this.translate.get('invitationCode').subscribe((res: string) => {
      this.invitationCode = res;
    });
    this.translate.get('usageAgreement').subscribe((res: string) => {
      this.usageAgreement = res;
    });
    this.translate.get('confirmationPassword').subscribe((res: string) => {
      this.confirmationPassword = res;
    });
    this.translate.get('confirmationReAndPassword').subscribe((res: string) => {
      this.confirmationReAndPassword = res;
    });
    this.translate.get('usageAgreementCon').subscribe((res: string) => {
      this.usageAgreementCon = res;
    });
    this.translate.get('sorryRegAppOne').subscribe((res: string) => {
      this.sorryRegAppOne = res;
    });
    this.translate.get('sorryRegAppTow').subscribe((res: string) => {
      this.sorryRegAppTow = res;
    });
    this.translate.get('sorryRegAppThree').subscribe((res: string) => {
      this.sorryRegAppThree = res;
    });
    this.translate.get('sorryRegAppFor').subscribe((res: string) => {
      this.sorryRegAppFor = res;
    });
    this.translate.get('sorryRegAppFive').subscribe((res: string) => {
      this.sorryRegAppFive = res;
    });
    this.translate.get('sorryRegAppsix').subscribe((res: string) => {
      this.sorryRegAppsix = res;
    });
    this.translate.get('classCopyCode').subscribe((res: string) => {
      this.classCopyCode = res;
    });
  }
  async checkpolidy(){
    let model = await this.modalController.create({
      component:PolicycompComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
    });
    await model.present();
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
    this.storage.get('productInShopingCart').then(productInShopingCart=>{
      this.productInShopingCart = productInShopingCart;
      if(productInShopingCart==null || productInShopingCart=="" ||  productInShopingCart==0 )
        this.productInShopingCart = 0;
    });
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'))
      this.showLoginWithApple = 1;
    this.backToPage = await this.storage.get('internetBack');
    if(this.backToPage !='1'){
      this.navCtrl.navigateRoot("/errors");
    }
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.checkRegistration();
    this.checkIfSiteWork();
  }
  async checkRegistration(){
    this.usersService.checkRegistrationApi().then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult!=1){
        this.navCtrl.navigateRoot("/sitework");
      }
    }).catch(e=>{
      this.navCtrl.navigateRoot("/sitework");
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
  checkInvitation(event:any){
    this.invitation = event.target.value;
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
  checkRePassword(event:any){
    this.errorRePassword = "succsessFiled";
    this.isErrorRePassword = 1;
    this.rePassword = event.target.value;
    if(this.rePassword == "" || this.rePassword == undefined){
      this.errorRePassword = "errorFiled";
      this.isErrorRePassword = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.number != undefined && this.number != "" && this.password != undefined && this.password != "" && this.rePassword != undefined && this.rePassword != "" && this.password == this.rePassword){
      this.isdisabled = true;
    }
  }
  getTheIngredients(event:any){
    if(event.detail.checked == true){
      this.checkPlicy = 1;
    }else{
      this.checkPlicy = 0;
    }
  }
  async registration(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.number == undefined || this.number == "") && (this.password == undefined || this.password == "") && (this.rePassword == undefined || this.rePassword == "")){
      this.errorNumber = "errorFiled";
      this.errorPassword = "errorFiled";
      this.errorRePassword = "errorFiled";
      this.isErrorNumber = 0;
      this.isErrorPassword = 0;
      this.isErrorRePassword = 0;
      this.errorRePasswordMsg = this.confirmationPassword;
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
    if(this.rePassword == undefined || this.rePassword == ""){
      this.errorRePassword = "errorFiled";
      this.isErrorRePassword = 0;
      this.errorRePasswordMsg = this.confirmationPassword;
      this.isdisabled = false;
      return false;
    }
    if(this.password != this.rePassword){
      this.errorRePassword = "errorFiled";
      this.isErrorRePassword = 0;
      this.errorRePasswordMsg = this.confirmationReAndPassword;
      this.isdisabled = false;
      return false;
    }
    if(this.checkPlicy == 0){
      this.message = this.usageAgreementCon;
      this.displayResult(this.message);
      return false;
    }
    if(this.number != undefined && this.password != undefined && this.rePassword != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      await loading.present();
      this.usersService.registration(this.number,this.invitation,this.password,this.key).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = this.sorryRegAppOne;
          this.displayResult(this.message);
          await this.storage.set('userId',this.returnData.Error.userId);
          await this.storage.set('countryId',this.countryId);
          this.navCtrl.navigateRoot("/activation");
        }else if(this.operationResult==2){
          this.message = this.sorryRegAppTow;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.sorryRegAppThree;
          this.displayResult(this.message);
        }else if(this.operationResult==4){
          this.message = this.sorryRegAppFor;
          this.displayResult(this.message);
        }else{
          this.message = this.sorryRegAppFive;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.sorryRegAppsix;
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
    return true;
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
  changeInputType(){
    this.showPassword = !this.showPassword;
  }
  changeReInputType(){
    this.showPasswordRe = !this.showPasswordRe;
  }
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
