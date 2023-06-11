import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-changelangout',
  templateUrl: './changelangout.page.html',
  styleUrls: ['./changelangout.page.scss'],
})
export class ChangelangoutPage implements OnInit {
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
  public services:any;
  public detailsNote:any;
  public selectLange:any='1'
  public setting:any;
  public changeLangButton:any;
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
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
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
  async changeLang(lang:any){
    if(lang==1)
      await this.storage.set('checkLanguage','ar');
    else
      await this.storage.set('checkLanguage','en');
    await this.getDeviceLanguage();
    location.reload();
  }
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
