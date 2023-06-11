import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-activation',
  templateUrl: './activation.page.html',
  styleUrls: ['./activation.page.scss'],
})
export class ActivationPage implements OnInit {
  public number:any;
  public errorNumber:any="";
  public isErrorNumber:any = 1;

  public activeCode:any;
  public  errorActiveNumber:any="";
  public isErrorActiveNumber:any = 1;

  public isdisabled:boolean=true;
  public backToPage:any;
  public returnData:any;
  public returnDataUser:any;
  public operationResult:any;
  public message:any;
  public loadingShow:any = 0;
  public returnFullName:any;
  public returnNumber:any;

  public fullNameLoginRe:any;
  public numberLoginRe:any;
  public passwordLoginRe:any;
  public userIdRe:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public productInShopingCart:any;
  public userId:any;
  public startTime = 1;
  public counter = 60;
  public showButton = 0;
  public returnDataCodeUser:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public activationAccount:any;
  public placeHolderActivationAccount:any;
  public reSendActivationAccount:any;
  public errorActivationAccount:any;
  public tryActivationAccount:any;
  public secund:any;
  public confirmed:any;
  public sorryActiveAppOne:any;
  public sorryActiveAppTow:any;
  public sorryActiveAppThree:any;
  public sorryActiveAppFor:any;
  public sorryActiveAppFive:any;
  public sorryActiveAppsix:any;
  public sorryActiveAppSevin:any;
  public classCopyCode:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','activation');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/registration");
    });
  }
  async reSendActiveCode() {
    this.counter--;
    if (this.counter != 0) {
      setTimeout(() => {
        this.reSendActiveCode();
      }, 1000)
    }else{
      this.showButton = 1
      this.startTime = 0
    }
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('activationAccount').subscribe((res: string) => {
      this.activationAccount = res;
    });
    this.translate.get('placeHolderActivationAccount').subscribe((res: string) => {
      this.placeHolderActivationAccount = res;
    });
    this.translate.get('reSendActivationAccount').subscribe((res: string) => {
      this.reSendActivationAccount = res;
    });
    this.translate.get('errorActivationAccount').subscribe((res: string) => {
      this.errorActivationAccount = res;
    });
    this.translate.get('tryActivationAccount').subscribe((res: string) => {
      this.tryActivationAccount = res;
    });
    this.translate.get('secund').subscribe((res: string) => {
      this.secund = res;
    });
    this.translate.get('confirmed').subscribe((res: string) => {
      this.confirmed = res;
    });
    this.translate.get('sorryActiveAppOne').subscribe((res: string) => {
      this.sorryActiveAppOne = res;
    });
    this.translate.get('sorryActiveAppTow').subscribe((res: string) => {
      this.sorryActiveAppTow = res;
    });
    this.translate.get('sorryActiveAppThree').subscribe((res: string) => {
      this.sorryActiveAppThree = res;
    });
    this.translate.get('sorryActiveAppFor').subscribe((res: string) => {
      this.sorryActiveAppFor = res;
    });
    this.translate.get('sorryActiveAppFive').subscribe((res: string) => {
      this.sorryActiveAppFive = res;
    });
    this.translate.get('sorryActiveAppsix').subscribe((res: string) => {
      this.sorryActiveAppsix = res;
    });
    this.translate.get('sorryActiveAppsix').subscribe((res: string) => {
      this.sorryActiveAppsix = res;
    });
    this.translate.get('classCopyCode').subscribe((res: string) => {
      this.classCopyCode = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.reSendActiveCode();
    this.userId = await this.storage.get('userId');
    this.backToPage = await this.storage.get('internetBack');
    if(this.backToPage !='1'){
      this.navCtrl.navigateRoot("/errors");
    }
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','activation');
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
  reSend(){
    this.usersService.resenData(this.userId).then(async data=>{
      this.returnDataCodeUser = data;
      this.operationResult = this.returnDataCodeUser.Error.ErrorCode;
      if(this.operationResult == 1){
        this.message = this.sorryActiveAppOne;
        this.displayResult(this.message);
        this.counter = 60;
        this.showButton = 0
        this.startTime = 1
        this.reSendActiveCode();
      }else{
        this.message = this.sorryActiveAppTow;
        this.displayResult(this.message);
      }
    }).catch(e=>{
      this.message = this.sorryActiveAppTow;
      this.displayResult(this.message);
    })
  }
  checkActiveNumber(event:any){
    this.errorActiveNumber = "succsessFiled";
    this.isErrorActiveNumber = 1;
    this.activeCode = event.target.value;
    if(this.activeCode == "" || this.activeCode == undefined){
      this.errorActiveNumber = "errorFiled";
      this.isErrorActiveNumber = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.activeCode != undefined && this.activeCode != "" ){
      this.isdisabled = true;
    }
  }
  async activation(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','activation');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.activeCode == undefined || this.activeCode == "")){
      this.errorNumber = "errorFiled";
      this.errorActiveNumber = "errorFiled";
      this.isErrorNumber = 0;
      this.isErrorActiveNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.activeCode == undefined || this.activeCode == ""){
      this.errorActiveNumber = "errorFiled";
      this.isErrorActiveNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.activeCode != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1000,
      });
      await loading.present();
      this.usersService.activationUser(this.userId,this.activeCode).then(async data=>{
        this.returnDataUser = data;
        this.operationResult = this.returnDataUser.Error.ErrorCode;
        if(this.operationResult==1){
        await this.storage.set('fullNameLogin',this.returnDataUser.Data.name);
          await this.storage.set('numberLogin',this.returnDataUser.Data.mobile);
          await this.storage.set('passwordLogin',this.returnDataUser.Data.password);
          await this.storage.set('type',this.returnDataUser.Data.type);
          await this.storage.set('userId',this.returnDataUser.Data.id);
          await this.storage.set('catId',this.returnDataUser.Data.catId);
          await this.storage.set('subCatId',this.returnDataUser.Data.subCatId);
          await this.storage.set('points',this.returnDataUser.Data.points);
          await this.storage.set('isActive',this.returnDataUser.Data.is_active);
          await this.storage.set('active',this.returnDataUser.Data.active);
          await this.storage.set('image',this.returnDataUser.Data.image);
          this.message = this.sorryActiveAppThree;
          this.displayResult(this.message);
          this.navCtrl.navigateRoot("/usertype");
        }else if(this.operationResult==2){
          this.message = this.sorryActiveAppFor;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.sorryActiveAppFive;
          this.displayResult(this.message);
        }else if(this.operationResult==4){
          this.message = this.sorryActiveAppFive;
          this.displayResult(this.message);
        }else{
          this.message = this.sorryActiveAppsix;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.sorryActiveAppSevin;
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
    await this.checkRegistration();
    await this.checkIfSiteWork();
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
