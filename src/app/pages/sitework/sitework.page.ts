import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sitework',
  templateUrl: './sitework.page.html',
  styleUrls: ['./sitework.page.scss'],
})
export class SiteworkPage implements OnInit {
  public backToPage:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public privacyPolicy: any;
  public msgApp: any;
  public msgAppSorry: any;
  public msgAppTryLater: any;
  constructor(private globalization: Globalization, private translate: TranslateService,private network:Network,private navCtrl: NavController,private storage:Storage ) {
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('msgApp').subscribe((res: string) => {
      this.msgApp = res;
    });
    this.translate.get('msgAppSorry').subscribe((res: string) => {
      this.msgAppSorry = res;
    });
    this.translate.get('msgAppTryLater').subscribe((res: string) => {
      this.msgAppTryLater = res;
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
  async backToHomePage(){
    this.navCtrl.navigateRoot("/home");
  }
}
