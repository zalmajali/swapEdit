import { Component, OnInit,ViewChild } from '@angular/core';
import {MenuController, Platform, NavController, IonSlides, ModalController, ToastController,IonInput} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sendinvitation',
  templateUrl: './sendinvitation.page.html',
  styleUrls: ['./sendinvitation.page.scss'],
})
export class SendinvitationPage implements OnInit {
  public operationResult:any;
  public hours:any=0
  public minutes:any=0
  public seconds:any=0
  public fullNameLogin:any;
  public emailLogin:any;
  public returnData:any;
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catId:any;
  public points:any;
  public type:any;
  public email:any;
  public invitationCode:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public isActive:any;
  public active:any;
  public message:any;
  public returnSettingData:any;
  public invitationTime:any=0;
  public invitationMsg:any;
  public returnDataUser:any;
  public activeTime:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public classCopyCode:any;
  public floatTow:any;
  public inviteFrind:any;
  public inviteFrindNot:any;
  public inviteFrindTime:any;
  public inviteFrindTimeNote:any;
  public hourLang:any;
  public minutesLang:any;
  public secondsLang:any;
  public inviteFrindChanc:any;
  public inviteFrindChancTow:any;
  public code:any;
  public copyCode:any;
  public invitBy:any;
  public copyCodeDone:any;
  public rigistarByCode:any;

  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private clipboard: Clipboard,private socialSharing: SocialSharing,private toastCtrl: ToastController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','home');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
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
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('classCopyCode').subscribe((res: string) => {
      this.classCopyCode = res;
    });
    this.translate.get('inviteFrind').subscribe((res: string) => {
      this.inviteFrind = res;
    });
    this.translate.get('inviteFrindNot').subscribe((res: string) => {
      this.inviteFrindNot = res;
    });
    this.translate.get('inviteFrindTime').subscribe((res: string) => {
      this.inviteFrindTime = res;
    });
    this.translate.get('inviteFrindTimeNote').subscribe((res: string) => {
      this.inviteFrindTimeNote = res;
    });
    this.translate.get('hour').subscribe((res: string) => {
      this.hourLang = res;
    });
    this.translate.get('minutes').subscribe((res: string) => {
      this.minutesLang = res;
    });
    this.translate.get('seconds').subscribe((res: string) => {
      this.secondsLang = res;
    });
    this.translate.get('inviteFrindChanc').subscribe((res: string) => {
      this.inviteFrindChanc = res;
    });
    this.translate.get('inviteFrindChancTow').subscribe((res: string) => {
      this.inviteFrindChancTow = res;
    });
    this.translate.get('code').subscribe((res: string) => {
      this.code = res;
    });
    this.translate.get('copyCode').subscribe((res: string) => {
      this.copyCode = res;
    });
    this.translate.get('invitBy').subscribe((res: string) => {
      this.invitBy = res;
    });
    this.translate.get('copyCodeDone').subscribe((res: string) => {
      this.copyCodeDone = res;
    });
    this.translate.get('rigistarByCode').subscribe((res: string) => {
      this.rigistarByCode = res;
    });
    this.translate.get('floatTow').subscribe((res: string) => {
      this.floatTow = res;
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
  async selectvAL(invitationTime:any=0,userId:any){
    if(invitationTime!=0) {
      var countDownDate = new Date(invitationTime).getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      this.hours = Math.floor(distance / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor(((distance % (1000*60*60))% (1000*60)) / 1000);
      if (distance > 0) {
        setTimeout(async () => {
          this.selectvAL(this.invitationTime,userId);
        }, 1000)
      }
    }else{
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    }
  }
  async functionGetInformation(userId:any){
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
        this.invitationTime = this.returnDataUser.Data.invitationTime;
        this.activeTime = this.returnDataUser.Data.activeTime;
        if(this.invitationTime == 0)
          this.selectvAL(0,userId)
      }
    })
    setTimeout(()=>{
      this.functionGetInformation(userId);
    },3500)
}
  async ngOnInit() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    await this.getDeviceLanguage();
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.isActive = await this.storage.get('isActive');
    this.active = await this.storage.get('active');
    this.invitationCode = await this.storage.get('invitationCode');
    if(this.userId == null || this.numberLogin == null  || this.type == null || this.type == null){
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
    await this.categoriesService.setting().then(async data=>{
      this.returnSettingData = data;
      this.operationResult = this.returnSettingData.Error.ErrorCode;
      if(this.operationResult==1){
        if(this.checkLanguage){
          this.language = this.checkLanguage;
          if(this.language == "en"){
            this.invitationMsg = this.returnSettingData.Data.invitationMsg_en;
          }
          else{
            this.invitationMsg = this.returnSettingData.Data.invitationMsg_ar;
          }
        }else{
          if (window.Intl && typeof window.Intl === 'object') {
            let Val  = navigator.language.split("-");
            if (Val[0])
              this.language = Val[0];
            else
              this.language = 'en';
            if(this.language == "en"){
              this.invitationMsg = this.returnSettingData.Data.invitationMsg_en;
            }
            else{
              this.invitationMsg = this.returnSettingData.Data.invitationMsg_ar;
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
                this.invitationMsg = this.returnSettingData.Data.invitationMsg_en;
              }
              else{
                this.invitationMsg = this.returnSettingData.Data.invitationMsg_ar;
              }
            }).catch(e => {console.log(e);});
          }
        }
      }
    });
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.invitationTime = this.returnDataUser.Data.invitationTime;
        this.activeTime = this.returnDataUser.Data.activeTime;
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
    this.functionGetInformation(this.userId)
    if(this.invitationTime!=0)
      await this.selectvAL(this.invitationTime,this.userId);
    await this.checkIfSiteWork();
    this.notifications();
  }
  copyCodeVal(){
    this.clipboard.copy(this.invitationCode);
    this.message = this.copyCodeDone;
    this.displayResult(this.message);
    //this.clipboard.clear();
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
  functionshareValuseFacebook(){
    let values = this.invitationMsg.replace("$#$", this.fullName)+" "+this.rigistarByCode+" "+this.invitationCode;
    this.socialSharing.shareViaFacebook(values).then(() => {
    }).catch(() => {
    });
  }
  functionshareValuseSMS(){
    let values = this.invitationMsg.replace("$#$", this.fullName)+" "+this.rigistarByCode+" "+this.invitationCode;
    this.socialSharing.share(values).then(() => {
    }).catch(() => {
    });
  }
  functionshareValuseWhatsapp(){
    let values = this.invitationMsg.replace("$#$", this.fullName)+" "+this.rigistarByCode+" "+this.invitationCode;
    this.socialSharing.shareViaWhatsApp(values).then(() => {
    }).catch(() => {
    });
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
  functionGoServices(catId:any,catName:any){
    this.navCtrl.navigateRoot(['/services', {catId:catId,catName:catName}])
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
