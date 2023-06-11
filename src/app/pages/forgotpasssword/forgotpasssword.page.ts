import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {CountriesComponent} from "../countries/countries.component";
@Component({
  selector: 'app-forgotpasssword',
  templateUrl: './forgotpasssword.page.html',
  styleUrls: ['./forgotpasssword.page.scss'],
})
export class ForgotpassswordPage implements OnInit {
  public number:any;
  public errorNumber:any="";
  public isErrorNumber:any = 1;
  public isdisabled:boolean=true;
  public backToPage:any;
  public returnData:any;
  public operationResult:any;
  public message:any;
  public returnFullName:any;
  public returnNumber:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public productInShopingCart:any;
  public key: any="962";
  public countryId: any="962";
  public image: any="../../assets/imgs/jo.png";
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public placeHolderForgotNumber:any;
  public errorForgotNumber:any;
  public sorryForgotAppOne:any;
  public sorryForgotAppTow:any;
  public sorryForgotAppThree:any;
  public sorryForgotAppFor:any;
  public sorryForgotAppFive:any;
  public repack:any;
  public forgotPasswordVal:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private network:Network,private modalController: ModalController,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpasssword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/login");
    });
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('forgotPassword').subscribe((res: string) => {
      this.forgotPasswordVal = res;
    });
    this.translate.get('placeHolderForgotNumber').subscribe((res: string) => {
      this.placeHolderForgotNumber = res;
    });
    this.translate.get('errorForgotNumber').subscribe((res: string) => {
      this.errorForgotNumber = res;
    });
    this.translate.get('sorryForgotAppOne').subscribe((res: string) => {
      this.sorryForgotAppOne = res;
    });
    this.translate.get('sorryForgotAppTow').subscribe((res: string) => {
      this.sorryForgotAppTow = res;
    });
    this.translate.get('sorryForgotAppThree').subscribe((res: string) => {
      this.sorryForgotAppThree = res;
    });
    this.translate.get('sorryForgotAppFor').subscribe((res: string) => {
      this.sorryForgotAppFor = res;
    });
    this.translate.get('sorryForgotAppFive').subscribe((res: string) => {
      this.sorryForgotAppFive = res;
    });
    this.translate.get('repack').subscribe((res: string) => {
      this.repack = res;
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
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.storage.get('productInShopingCart').then(productInShopingCart=>{
      this.productInShopingCart = productInShopingCart;
      if(productInShopingCart==null || productInShopingCart=="" ||  productInShopingCart==0 )
        this.productInShopingCart = 0;
    });
    /*this.backToPage = await this.storage.get('internetBack');
    if(this.backToPage !='1'){
      this.navCtrl.navigateRoot("/errors");
    }*/
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpasssword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
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
  isEnterAllValues(){
    if(this.number != undefined && this.number != ""){
      this.isdisabled = true;
    }
  }
  async forgotPassword(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpasssword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.number == undefined || this.number == "")){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.number != undefined ){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      await loading.present();
      this.usersService.forgotPassword(this.number,this.key).then(data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = this.sorryForgotAppOne;
          this.displayResult(this.message);
          this.navCtrl.navigateRoot("/login");
        }else if(this.operationResult==2){
          this.message = this.sorryForgotAppTow;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message =  this.sorryForgotAppThree;
          this.displayResult(this.message);
        }else{
          this.message =  this.sorryForgotAppFor;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.sorryForgotAppFive;
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
  functionGoToHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionGoToStores(){
    this.navCtrl.navigateRoot("/stores");
  }
  functionGoToShoppingcart(){
    this.navCtrl.navigateRoot("/shoppingcart");
  }
  functionGoToProducts(){
    this.navCtrl.navigateRoot("/products");
  }
  async functionOpenMenue(){
    this.fullNameLogin = await this.storage.get('fullNameLogin');
    this.emailLogin = await this.storage.get('emailLogin');
    if(this.fullNameLogin!=null || this.emailLogin!=null) {
      let typeUser = await this.storage.get('type');
      if(typeUser == 1){
        this.menu.enable(true,"third");
        this.menu.open("third");
      }else{
        this.menu.enable(true,"last");
        this.menu.open("last");
      }
    }else{
      this.menu.enable(true,"first");
      this.menu.open("first");
    }
  }
}
