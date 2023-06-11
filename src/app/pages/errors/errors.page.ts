import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.page.html',
  styleUrls: ['./errors.page.scss'],
})
export class ErrorsPage implements OnInit {
  public backToPage:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public privacyPolicy: any;
  public msgApp: any;
  public msgAppError: any;
  public msgAppTryError: any;
  public reTry: any;
  constructor(private globalization: Globalization, private translate: TranslateService,private network:Network,private navCtrl: NavController,private storage:Storage ) {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.storage.set('internetBack','1');
    });
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('msgApp').subscribe((res: string) => {
      this.msgApp = res;
    });
    this.translate.get('msgAppError').subscribe((res: string) => {
      this.msgAppError = res;
    });
    this.translate.get('msgAppTryError').subscribe((res: string) => {
      this.msgAppTryError = res;
    });
    this.translate.get('reTry').subscribe((res: string) => {
      this.reTry = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.storage.set('internetBack','1');
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
  async backToHomePage(){
    this.backToPage = await this.storage.get('thisPageReturn');
    if(this.backToPage == null || this.backToPage == undefined || this.backToPage == 0)
      this.navCtrl.navigateRoot("/home");
    else
      this.navCtrl.navigateRoot("/"+this.backToPage);
  }
}
