import { Component, OnInit,Input } from '@angular/core';
import {ModalController, Platform,NavController,LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import {UsersService} from "../../services/users.service";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
@Component({
  selector: 'app-policycomp',
  templateUrl: './policycomp.component.html',
  styleUrls: ['./policycomp.component.scss'],
})
export class PolicycompComponent implements OnInit {
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
  public floatD:any;
  constructor(private storage: Storage,private globalization: Globalization, private translate: TranslateService,private activaterouter : ActivatedRoute,private loading: LoadingController,private usersService:UsersService,private navCtrl: NavController,private router : Router,private modalController: ModalController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('privacyPolicy').subscribe((res: string) => {
      this.privacyPolicy = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
  }
  async ngOnInit() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    await this.getDeviceLanguage();
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
          this.language = this.checkLanguage;
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
  closeModel(){
    this.modalController.dismiss({
    });
  }
}
