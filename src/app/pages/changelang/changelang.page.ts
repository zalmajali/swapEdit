import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-changelang',
  templateUrl: './changelang.page.html',
  styleUrls: ['./changelang.page.scss'],
})
export class ChangelangPage implements OnInit {
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catUserId:any;
  public points:any;
  public type:any;
  public email:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public operationResult:any;
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
  public selectLange:any='1'
  public setting:any;
  public changeLangButton:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private activaterouter : ActivatedRoute,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController) {
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
    this.translate.get('changeLang').subscribe((res: string) => {
      this.changeLangButton = res;
    });
    this.translate.get('setting').subscribe((res: string) => {
      this.setting = res;
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
      if(this.language == 'en')
        this.selectLange = 2;
      else
        this.selectLange = 1;
      await this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0]){
          this.language = Val[0];
          if(this.language == 'en')
            this.selectLange = 2;
          else
            this.selectLange = 1;
        }
        else{
          this.language = 'en';
          this.selectLange = 2;
        }
        this.translate.use(this.language);
        await this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(async res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0]) {
            this.language = Val[0];
            if(this.language == 'en')
              this.selectLange = 2;
            else
              this.selectLange = 1;
          }
          else{
            this.language = 'en';
            this.selectLange = 2;
          }
          this.translate.use(this.language);
          await this.initialiseTranslation();
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
  async changeLang(lang:any){
    if(lang==1)
      await this.storage.set('checkLanguage','ar');
    else
      await this.storage.set('checkLanguage','en');
    await this.getDeviceLanguage();
    location.reload();
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
