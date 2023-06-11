import { Component, OnInit } from '@angular/core';
import {LoadingController,MenuController, NavController, Platform} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
  public description:any;
  public isThere:any = 1;
  public returnData:any;
  public operationResult:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public productInShopingCart:any;
  public title:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public privacyPolicy: any;

  constructor(private globalization: Globalization, private translate: TranslateService,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','policy');
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
    this.translate.get('privacyPolicy').subscribe((res: string) => {
      this.privacyPolicy = res;
    });
  }
  async ngOnInit() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    await this.getDeviceLanguage();
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','policy');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.usersService.policyApp().then(async data=>{
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      await loading.present();
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult==1){
        if(this.checkLanguage){
          this.language = this.checkLanguage
          if(this.language == "en")
            this.description = this.returnData.Data.description_en;
          else
            this.description = this.returnData.Data.description_ar;
        }else{
          if (window.Intl && typeof window.Intl === 'object') {
            let Val  = navigator.language.split("-");
            if (Val[0])
              this.language = Val[0];
            else
              this.language = 'en';
            if(this.language == "en")
              this.description = this.returnData.Data.description_en;
            else
              this.description = this.returnData.Data.description_ar;
          }
          else{
            this.globalization.getPreferredLanguage().then(res => {
              let Val  = res.value.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en")
                this.description = this.returnData.Data.description_en;
              else
                this.description = this.returnData.Data.description_ar;
            }).catch(e => {console.log(e);});
          }
        }
        this.title = this.returnData.Data.title;
        if(this.description)
          this.isThere = 1;
        else
          this.isThere = 0;
      }
      else if(this.operationResult==2){
        this.isThere = 0;
      }
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
