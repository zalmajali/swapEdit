import { Component, OnInit,Input,ViewChild } from '@angular/core';
import {ModalController, Platform,NavController,IonDatetime} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent  implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime | any;
  public checkVal: any=0;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public confirmed:any;
  public cancel:any;
  public dateVal:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private storage: Storage,private activaterouter : ActivatedRoute,private navCtrl: NavController,private router : Router,private modalController: ModalController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  closeModel(){
    this.modalController.dismiss({
    });
  }
  selectDate(event:any){
    this.dateVal = event.target.value;
    this.checkVal = this.dateVal.split('T');
    this.modalController.dismiss({
      "date":this.checkVal[0],
    })
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('confirmed').subscribe((res: string) => {
      this.confirmed = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
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
}
