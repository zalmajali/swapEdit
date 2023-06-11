import { Component, OnInit,Input } from '@angular/core';
import {ModalController, Platform,NavController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
@Component({
  selector: 'app-alertdata',
  templateUrl: './alertdata.component.html',
  styleUrls: ['./alertdata.component.scss'],
})
export class AlertdataComponent implements OnInit {
  @Input() opera: number | any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public alertOne:any;
  public alertTow:any;
  public alertThree:any;
  public out:any;
  public sendInvite:any;
  public alertFore:any;
  public alertFive:any;
  public alertSix:any;
  public alertSevn:any;
  public alertEghit:any;
  public alertNine:any;
  public alertTen:any;
  public alertElaven:any;
  public goToChargPage:any;
  public moCardEnagh:any;
  public chargPageCardBy:any;
  public rechargeCard:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private storage: Storage,private activaterouter : ActivatedRoute,private navCtrl: NavController,private router : Router,private modalController: ModalController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  closeModel(){
    this.modalController.dismiss({
    });
  }
  functionGoInvitations(){
    this.navCtrl.navigateRoot("/sendinvitation");
    this.modalController.dismiss({
    });
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('alertOne').subscribe((res: string) => {
      this.alertOne = res;
    });
    this.translate.get('alertTow').subscribe((res: string) => {
      this.alertTow = res;
    });
    this.translate.get('alertThree').subscribe((res: string) => {
      this.alertThree = res;
    });
    this.translate.get('out').subscribe((res: string) => {
      this.out = res;
    });
    this.translate.get('sendInvite').subscribe((res: string) => {
      this.sendInvite = res;
    });
    this.translate.get('alertFore').subscribe((res: string) => {
      this.alertFore = res;
    });
    this.translate.get('alertFive').subscribe((res: string) => {
      this.alertFive = res;
    });
    this.translate.get('alertFive').subscribe((res: string) => {
      this.alertFive = res;
    });
    this.translate.get('alertSevn').subscribe((res: string) => {
      this.alertSevn = res;
    });
    this.translate.get('alertEghit').subscribe((res: string) => {
      this.alertEghit = res;
    });
    this.translate.get('alertNine').subscribe((res: string) => {
      this.alertNine = res;
    });
    this.translate.get('alertTen').subscribe((res: string) => {
      this.alertTen = res;
    });
    this.translate.get('alertElaven').subscribe((res: string) => {
      this.alertElaven = res;
    });
    this.translate.get('goToChargPage').subscribe((res: string) => {
      this.goToChargPage = res;
    });
    this.translate.get('moCardEnagh').subscribe((res: string) => {
      this.moCardEnagh = res;
    });
    this.translate.get('chargPageCardBy').subscribe((res: string) => {
      this.chargPageCardBy = res;
    });
    this.translate.get('rechargeCard').subscribe((res: string) => {
      this.rechargeCard = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();

  }
  chargeInformation(){
    this.router.navigateByUrl('chargeinformation');
    this.modalController.dismiss({
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
}
