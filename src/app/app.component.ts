import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, Platform,NavController,MenuController,ToastController} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FirebaseMessaging } from '@awesome-cordova-plugins/firebase-messaging/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {StoresService} from "./services/stores.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public lang: any;
  public showFirstPage:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public showSubOne:any = 0;
  public arrowValOne:any=0;
  public arrowValtow:any=0;
  public arrowValthree:any=0;
  public arrowValfor:any=0;
  public arrowValSelectedOne:any="chevron-up-outline";
  public arrowValSelectedtow:any="chevron-up-outline";
  public arrowValSelectedthree:any="chevron-up-outline";
  public arrowValSelectedfor:any="chevron-up-outline";
  public appPagesfirst:any= [];
  public appPagesLast:any= [];
  public appPagesThird:any= [];
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catId:any;
  public points:any;
  public type:any;
  public email:any;
  public appPages:any;
  public isActive:any;
  public active:any;
  public image:any="../../assets/imgs/def.png";
  public isaddInformation:any;
  public instagramLink:any;
  public facebookLink:any;
  public youtupeLink:any;
  public editAccount:any;
  public titlePush:any;
  public subHeaderPush:any;
  public imagePush:any;
  //langSeting
  public checkLanguage: any=0;
  public language: any;
  public menuDirection:any="start";
  public dir:any;
  public cardBalance:any;
  public returnUsersData:any;
  public operationResult:any;
  public currentBalance:any;
  public mony:any;
  public recharge:any;
  public yas:any;
  public no:any;
  public arYorShore:any;
  public styleMenue:any;
  public arrowDirection:any;
  constructor(private globalization: Globalization,private translate: TranslateService,private storesService:StoresService,private firebaseMessaging : FirebaseMessaging,private toastCtrl: ToastController,private navCtrl: NavController,private iab: InAppBrowser,private menu:MenuController,private alertController:AlertController,private statusBar:StatusBar,private router : Router,private platform : Platform,private storage: Storage) {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#494949');
      this.pushMessaging()
    });
    this.goPageValue();
    this.functionGetData();
  }
  initialiseTranslation(lang:any) {
    if (lang == 'ar') {
      this.yas="نعم";
      this.editAccount="تعديل";
      this.no="لا";
      this.arYorShore="! هل انت متأكد";
      this.currentBalance = "الرصيد الحالي";
      this.mony = "د.أ";
      this.recharge="إعادة الشحن";
      this.dir="rtl";
      this.menuDirection="end";
      this.styleMenue = "marginLeft";
      this.arrowDirection = "chevron-back";
      this.appPagesfirst = [
        { title: 'الرئيسية', url: '/homeout', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'تسجيل الدخول', url: '/login', subMenue:0,children:[],icon:"../../assets/imgs/login.png"},
        { title: 'إنشاء حساب', url: '/registration', subMenue:0,children:[],icon:"../../assets/imgs/create-account.png"},
        { title: 'تغيير اللغة', url: '/changelangout', subMenue:0,children:[],icon:"../../assets/imgs/change-language.png"},
        { title: 'المساعدة', url: '', subMenue:1,children:[
            { title: 'حول التطبيق', url: '/about'},
            { title: 'سياسة الخصوصية', url: '/policy'},
          ],icon:"../../assets/imgs/help-menu.png"
        },
      ];
      this.appPagesLast = [
        { title: 'الرئيسية', url: '/home', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'إعلاناتي', url: '', subMenue:1, subMenueShow:4,children:[
            { title: 'الإعلانات', url: '/advertisements'},
            { title: 'إضافة منتح', url: '/addproducts'},
          ],icon:"../../assets/imgs/my-ads.png"},
        { title: 'الإعدادات', url: '', subMenue:1, subMenueShow:3,children:[
            { title: 'صفحتي الشخصية', url: '/mypage'},
            { title: 'حسابي', url: '/account' },
            { title: 'إلغاء الحساب', url: '/deleteaccount'},
            { title: 'تغير كلمة المرور', url: '/changepassword'},
            { title: 'تغيير اللغة', url: '/changelang'},
          ],icon:"../../assets/imgs/settings.png"
        },
        { title: 'دعوة صديق', url: '/sendinvitation', subMenue:0,children:[],icon:"../../assets/imgs/invitation-menu.png"},
        { title: 'السجلات', url: '/archives', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'المفضلة', url: '/favourite', subMenue:0,children:[],icon:"../../assets/imgs/favorate-menu.png"},
        { title: 'إشعارات التطبيق', url: '/appnotification', subMenue:0,children:[],icon:"../../assets/imgs/notifications-menu.png"},
        { title: 'المساعدة', url: '', subMenue:1, subMenueShow:2,children:[
            { title: 'الاسئلة المتكررة', url: '/help'},
            { title: 'حول التطبيق', url: '/about'},
            { title: 'سياسة الخصوصية', url: '/policy'},
          ],icon:"../../assets/imgs/help-menu.png"
        },
        { title: 'تسجيل الخروج', url: '', subMenue:0,children:[],icon:"../../assets/imgs/logout-menu.png"},
      ];
      this.appPagesThird = [
        { title: 'الرئيسية', url: '/home', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'الإعدادات', url: '', subMenue:1, subMenueShow:3,children:[
            { title: 'صفحتي الشخصية', url: '/mypage'},
            { title: 'حسابي', url: '/account' },
            { title: 'إلغاء الحساب', url: '/deleteaccount'},
            { title: 'تغير كلمة المرور', url: '/changepassword'},
            { title: 'تغيير اللغة', url: '/changelang'},
          ],icon:"../../assets/imgs/settings.png"
        },
        { title: 'دعوة صديق', url: '/sendinvitation', subMenue:0,children:[],icon:"../../assets/imgs/invitation-menu.png"},
        { title: 'السجلات', url: '/archives', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'المفضلة', url: '/favourite', subMenue:0,children:[],icon:"../../assets/imgs/favorate-menu.png"},
        { title: 'إشعارات التطبيق', url: '/appnotification', subMenue:0,children:[],icon:"../../assets/imgs/notifications-menu.png"},
        { title: 'المساعدة', url: '', subMenue:1, subMenueShow:2,children:[
            { title: 'الاسئلة المتكررة', url: '/help'},
            { title: 'حول التطبيق', url: '/about'},
            { title: 'سياسة الخصوصية', url: '/policy'},
          ],icon:"../../assets/imgs/help-menu.png"
        },
        { title: 'تسجيل الخروج', url: '', subMenue:0,children:[],icon:"../../assets/imgs/logout-menu.png"},
      ];
    } else {
      this.yas="Yes";
      this.no="No";
      this.editAccount="Edit Account";
      this.arYorShore="Are You Sure!";
      this.currentBalance = "Current Balance";
      this.mony = "JD";
      this.recharge="Recharge";
      this.menuDirection="start";
      this.dir="ltr";
      this.styleMenue = "marginRight";
      this.arrowDirection = "chevron-forward";
      this.appPagesfirst = [
        { "title": 'Home', url: '/homeout', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'Sign In', url: '/login', subMenue:0,children:[],icon:"../../assets/imgs/login.png"},
        { title: 'Create Account', url: '/registration', subMenue:0,children:[],icon:"../../assets/imgs/create-account.png"},
        { title: 'Change Language', url: '/changelangout', subMenue:0,children:[],icon:"../../assets/imgs/change-language.png"},
        { title: 'Help', url: '', subMenue:1,children:[
            { title: 'About Us', url: '/about'},
            { title: 'Privacy Policy', url: '/policy'},
          ],icon:"../../assets/imgs/help-menu.png"
        },
      ];
      this.appPagesLast = [
        { title: 'Home', url: '/home', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'My List', url: '', subMenue:1, subMenueShow:4,children:[
            { title: 'My Ads', url: '/advertisements'},
            { title: 'Add Ads', url: '/addproducts'},
          ],icon:"../../assets/imgs/my-ads.png"},
        { title: 'Settings', url: '', subMenue:1, subMenueShow:3,children:[
            { title: 'Personal Page', url: '/mypage'},
            { title: 'My Account', url: '/account' },
            { title: 'Cancel Account', url: '/deleteaccount'},
            { title: 'Change Password', url: '/changepassword'},
            { title: 'Change Language', url: '/changelang'},
          ],icon:"../../assets/imgs/settings.png"
        },
        { title: 'Invite Friend', url: '/sendinvitation', subMenue:0,children:[],icon:"../../assets/imgs/invitation-menu.png"},
        { title: 'Archives', url: '/archives', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'Favorite', url: '/favourite', subMenue:0,children:[],icon:"../../assets/imgs/favorate-menu.png"},
        { title: 'App Notifications', url: '/appnotification', subMenue:0,children:[],icon:"../../assets/imgs/notifications-menu.png"},
        { title: 'Help', url: '', subMenue:1, subMenueShow:2,children:[
            { title: 'Asked Questions', url: '/help'},
            { title: 'About Us', url: '/about'},
            { title: 'Privacy Policy', url: '/policy'},
          ],icon:"../../assets/imgs/help-menu.png"
        },
        { title: 'Sign Out', url: '', subMenue:0,children:[],icon:"../../assets/imgs/logout-menu.png"},
      ];
      this.appPagesThird = [
        { title: 'Home', url: '/home', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'Settings', url: '', subMenue:1, subMenueShow:3,children:[
            { title: 'Personal Page', url: '/mypage'},
            { title: 'My Account', url: '/account' },
            { title: 'Cancel Account', url: '/deleteaccount'},
            { title: 'Change Password', url: '/changepassword'},
            { title: 'Change Language', url: '/changelang'},
          ],icon:"../../assets/imgs/settings.png"
        },
        { title: 'Invite Friend', url: '/sendinvitation', subMenue:0,children:[],icon:"../../assets/imgs/invitation-menu.png"},
        { title: 'Archives', url: '/archives', subMenue:0,children:[],icon:"../../assets/imgs/home-menu.png"},
        { title: 'Favorite', url: '/favourite', subMenue:0,children:[],icon:"../../assets/imgs/favorate-menu.png"},
        { title: 'App Notifications', url: '/appnotification', subMenue:0,children:[],icon:"../../assets/imgs/notifications-menu.png"},
        { title: 'Help', url: '', subMenue:1, subMenueShow:2,children:[
            { title: 'Asked Questions', url: '/help'},
            { title: 'About Us', url: '/about'},
            { title: 'Privacy Policy', url: '/policy'},
          ],icon:"../../assets/imgs/help-menu.png"
        },
        { title: 'Sign Out', url: '', subMenue:0,children:[],icon:"../../assets/imgs/logout-menu.png"},
      ];
    }
  }
  async pushMessaging(){
    this.firebaseMessaging.requestPermission({forceShow: false}).then(function() {
      console.log("Push messaging is allowed");
    });
    await this.firebaseMessaging.subscribe("swapko");
    await this.firebaseMessaging.onMessage().subscribe(async (data:any)=>{
      if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){
        this.titlePush = data.aps.alert.title;
        this.subHeaderPush = data.aps.alert.body;
        this.imagePush = "";
        if(data.fcm_options.image!=null && data.fcm_options.image!=null && data.fcm_options.image!=undefined && data.fcm_options.image!=0 && data.fcm_options.image!="")
          this.imagePush ='<img src="'+data.fcm_options.image+'" width="100%">';
        if(data.aps.alert.body!=null && data.aps.alert.body!=null && data.aps.alert.body!=undefined && data.aps.alert.body!=0 && data.aps.alert.body!=""){
          const alert = await this.alertController.create({
            header: this.titlePush,
            subHeader: this.subHeaderPush,
            cssClass: 'alertBacPush',
            mode: 'ios',
            message: this.imagePush,
            buttons: []
          });
          await alert.present();
        }
      }
      if(this.platform.is('android')){
        this.titlePush = data.gcm.title;
        this.subHeaderPush = data.gcm.body;
        this.imagePush = "";
        if(data.gcm.imageUrl!=null && data.gcm.imageUrl!=null && data.gcm.imageUrl!=undefined && data.gcm.imageUrl!=0 && data.gcm.imageUrl!="")
          this.imagePush ='<img src="'+data.gcm.imageUrl+'" width="100%">';
        if(data.gcm.body!=null && data.gcm.body!=null && data.gcm.body!=undefined && data.gcm.body!=0 && data.gcm.body!=""){
          const alert = await this.alertController.create({
            header: this.titlePush,
            subHeader: this.subHeaderPush,
            cssClass: 'alertBacPush',
            mode: 'ios',
            message: this.imagePush,
            buttons: []
          });
          await alert.present();
        }
      }
    })
    await this.firebaseMessaging.onBackgroundMessage().subscribe((data:any)=>{
     // console.log(data);
      console.log("asdasdasd");
    })
  }
  async goPageValue(){
    await this.getDeviceLanguage();
    this.facebookLink = await this.storage.get('facebookLink');
    this.youtupeLink = await this.storage.get('youtupeLink');
    this.instagramLink = await this.storage.get('instagramLink');
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    this.isActive = await this.storage.get('isActive');
    this.active = await this.storage.get('active');
    if(this.type == 1 || this.type == 2){
      this.image = await this.storage.get('image');
      if(this.image == null || this.image == 0 || this.image == undefined)
        this.image = "../../assets/imgs/def.png";
    }else{
      this.image = await this.storage.get('accountImage');
      if(this.image == null || this.image == 0 || this.image == undefined)
        this.image = "../../assets/imgs/def.png";
    }
    this.isaddInformation = await this.storage.get('isaddInformation');
    if(this.userId == null || this.numberLogin == null){
      this.navCtrl.navigateRoot('homeout');
    }else
    if(this.active == 1)
      this.navCtrl.navigateRoot('home');
    else
      this.router.navigateByUrl('homeout');
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      await this.initialiseTranslation(this.checkLanguage);
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0] == "ar" || Val[0] == "en")
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        await this.initialiseTranslation(this.language);
      }
      else{
        this.globalization.getPreferredLanguage().then(async res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0] == "ar" || Val[0] == "en")
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          await this.initialiseTranslation(this.language);
        }).catch(e => {console.log(e);});
      }
    }
  }
  chargeInformation(){
    this.router.navigateByUrl('chargeinformation');
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
  async functionOpenAccoun(){
    this.type = await this.storage.get('type');
    if(this.type == 1 || this.type == 2){
      this.image = await this.storage.get('image');
      if(this.image == null || this.image == 0 || this.image == undefined)
        this.image = "../../assets/imgs/def.png";
    }else{
      this.image = await this.storage.get('accountImage');
      if(this.image == null || this.image == 0 || this.image == undefined)
        this.image = "../../assets/imgs/def.png";
    }
    this.fullName = await this.storage.get('fullNameLogin');
  }
  functionGoPage(url:any){
    this.arrowValOne = 0;
    this.showSubOne = 0;
    this.arrowValSelectedOne = "chevron-up-outline";
    this.arrowValtow = 0;
    this.showSubOne = 0;
    this.arrowValSelectedtow = "chevron-up-outline";
    this.arrowValthree = 0;
    this.showSubOne = 0;
    this.arrowValSelectedthree = "chevron-up-outline";
    this.showSubOne = 0;
    this.arrowValSelectedfor = "chevron-up-outline";
    this.arrowValfor = 0;
    this.navCtrl.navigateRoot(url);
  }
  functionShowSubMenue(sub:any,selectVal:any){
    if(sub == 1){
      if(selectVal == 0){
        this.arrowValOne = 1;
        this.showSubOne = sub;
        this.arrowValSelectedOne = "chevron-down-outline";
        this.arrowValtow = 0;
        this.arrowValSelectedtow = "chevron-up-outline";
        this.arrowValthree = 0;
        this.arrowValSelectedthree = "chevron-up-outline";
        this.arrowValSelectedfor = "chevron-up-outline";
        this.arrowValfor = 0;
      }else{
        this.arrowValOne = 0;
        this.showSubOne = 0;
        this.arrowValSelectedOne = "chevron-up-outline";
        this.arrowValtow = 0;
        this.showSubOne = 0;
        this.arrowValSelectedtow = "chevron-up-outline";
        this.arrowValthree = 0;
        this.showSubOne = 0;
        this.arrowValSelectedthree = "chevron-up-outline";
        this.arrowValSelectedfor = "chevron-up-outline";
        this.arrowValfor = 0;
      }
    }
    if(sub == 2){
      if(selectVal == 0){
        this.arrowValtow = 1;
        this.showSubOne = sub;
        this.arrowValSelectedtow = "chevron-down-outline";
        this.arrowValthree = 0;
        this.arrowValSelectedthree = "chevron-up-outline";
        this.arrowValOne = 0;
        this.arrowValSelectedOne = "chevron-up-outline";
        this.arrowValSelectedfor = "chevron-up-outline";
        this.arrowValfor = 0;
      }else{
        this.arrowValOne = 0;
        this.showSubOne = 0;
        this.arrowValSelectedOne = "chevron-up-outline";
        this.arrowValtow = 0;
        this.showSubOne = 0;
        this.arrowValSelectedtow = "chevron-up-outline";
        this.arrowValthree = 0;
        this.showSubOne = 0;
        this.arrowValSelectedthree = "chevron-up-outline";
        this.arrowValSelectedfor = "chevron-up-outline";
        this.arrowValfor = 0;
      }
    }
    if(sub == 3){
      if(selectVal == 0){
        this.arrowValthree = 1;
        this.showSubOne = sub;
        this.arrowValSelectedthree = "chevron-down-outline";
        this.arrowValtow = 0;
        this.arrowValSelectedtow = "chevron-up-outline";
        this.arrowValOne = 0;
        this.arrowValSelectedOne = "chevron-up-outline";
        this.arrowValSelectedfor = "chevron-up-outline";
        this.arrowValfor = 0;
      }else{
        this.arrowValOne = 0;
        this.showSubOne = 0;
        this.arrowValSelectedOne = "chevron-up-outline";
        this.arrowValtow = 0;
        this.showSubOne = 0;
        this.arrowValSelectedtow = "chevron-up-outline";
        this.arrowValthree = 0;
        this.showSubOne = 0;
        this.arrowValSelectedthree = "chevron-up-outline";
        this.arrowValSelectedfor = "chevron-up-outline";
        this.arrowValfor = 0;
      }
    }
    if(sub == 4){
      if(selectVal == 0){
        this.arrowValfor = 1;
        this.showSubOne = sub;
        this.arrowValSelectedfor = "chevron-down-outline";
        this.arrowValtow = 0;
        this.arrowValSelectedtow = "chevron-up-outline";
        this.arrowValOne = 0;
        this.arrowValSelectedOne = "chevron-up-outline";
        this.arrowValSelectedthree = "chevron-up-outline";
        this.arrowValthree = 0;
      }else{
        this.arrowValOne = 0;
        this.showSubOne = 0;
        this.arrowValSelectedOne = "chevron-up-outline";
        this.arrowValtow = 0;
        this.showSubOne = 0;
        this.arrowValSelectedtow = "chevron-up-outline";
        this.arrowValthree = 0;
        this.showSubOne = 0;
        this.arrowValSelectedthree = "chevron-up-outline";
        this.arrowValSelectedfor = "chevron-up-outline";
        this.arrowValfor = 0;
      }
    }
  }
  functionOpenAccount(){
    this.menu.close();
    this.navCtrl.navigateRoot("/account");
  }
  async functionOpenFacebook(){
    this.facebookLink = await this.storage.get('facebookLink');
    const browser = this.iab.create(this.facebookLink,'_system',{location:'yes',clearcache:'yes',toolbar:'no'});
  }
  async functionYoutupe(){
    this.youtupeLink = await this.storage.get('youtupeLink');
    const browser = this.iab.create(this.youtupeLink,'_system',{location:'yes',clearcache:'yes',toolbar:'no'});
  }
  async functionInstagram(){
    this.instagramLink = await this.storage.get('instagramLink');
    const browser = this.iab.create(this.instagramLink,'_system',{location:'yes',clearcache:'yes',toolbar:'no'});
  }
  async signOut(){
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message:this.arYorShore,
      buttons: [
        {
          text: this.no,
          cssClass: 'alertButton',
          handler: () => {
          }
        }, {
          text: this.yas,
          cssClass: 'alertButton',
          handler: () => {
            this.storage.remove('fullNameLogin');
            this.storage.remove('numberLogin');
            this.storage.remove('passwordLogin');
            this.storage.remove('type');
            this.storage.remove('userId');
            this.storage.remove('catId');
            this.storage.remove('subCatId');
            this.storage.remove('points');
            this.router.navigateByUrl('login');
          }
        }
      ]
    });
    await alert.present();
  }
  async functionGetData(){
    let val = await this.storage.get('userId');
    this.storesService.userInformation(val).then(async data=>{
      this.returnUsersData = data;
      this.operationResult = this.returnUsersData.Error.ErrorCode;
      if(this.operationResult==1){
        this.cardBalance = this.returnUsersData.Data.cardBalance;
      }
    })
    setTimeout(() => {
      this.functionGetData();
    }, 1000);
  }
}
