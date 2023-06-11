import { Component, OnInit,Input } from '@angular/core';
import {ModalController, Platform,NavController,LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import {UsersService} from "../../services/users.service";
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent  implements OnInit {
  public operationResult:any;
  public returnCountriesData:any;
  public returnArrayCountriesFromServer:any;
  public returnCountriesArray:any = [];
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public floatD:any;
  public select:any;
  public arrowSideTow:any;
  public selectCountry:any;
  constructor(private storage: Storage,private globalization: Globalization,private categoriesService:CategoriesService, private translate: TranslateService,private activaterouter : ActivatedRoute,private loading: LoadingController,private usersService:UsersService,private navCtrl: NavController,private router : Router,private modalController: ModalController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('arrowSideTow').subscribe((res: string) => {
      this.arrowSideTow = res;
    });
    this.translate.get('selectCountry').subscribe((res: string) => {
      this.selectCountry = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.categoriesService.countries().then(async data=>{
      this.returnCountriesData = data;
      this.operationResult = this.returnCountriesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCountriesFromServer = this.returnCountriesData.Data.countries;
        for(let i = 0; i < this.returnArrayCountriesFromServer.length;i++) {
          this.returnCountriesArray[i]=[];
          this.returnCountriesArray[i]['id'] = this.returnArrayCountriesFromServer[i].id;
          await this.storage.get('checkLanguage').then(async checkLanguage=>{
            this.checkLanguage = checkLanguage
          });
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en"){
              this.floatD = "left";
              this.select = "Select";
              this.returnCountriesArray[i]['title'] = this.returnArrayCountriesFromServer[i].title_en;
            }
            else{
              this.floatD = "right";
              this.select = "إختيار";
              this.returnCountriesArray[i]['title'] = this.returnArrayCountriesFromServer[i].title_ar;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en"){
                this.floatD = "left";
                this.select = "Select";
                this.returnCountriesArray[i]['title'] = this.returnArrayCountriesFromServer[i].title_en;
              }
              else{
                this.floatD = "right";
                this.select = "إختيار";
                this.returnCountriesArray[i]['title'] = this.returnArrayCountriesFromServer[i].title_ar;
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
                  this.floatD = "left";
                  this.select = "Select";
                  this.returnCountriesArray[i]['title'] = this.returnArrayCountriesFromServer[i].title_en;
                }
                else{
                  this.floatD = "right";
                  this.select = "إختيار";
                  this.returnCountriesArray[i]['title'] = this.returnArrayCountriesFromServer[i].title_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
          this.returnCountriesArray[i]['key'] = this.returnArrayCountriesFromServer[i].key;
          this.returnCountriesArray[i]['image'] = this.returnArrayCountriesFromServer[i].image;
        }
      }
    });
  }
  getTheCountry(key:any,title:any,image:any){
    this.modalController.dismiss({
      "key":key,
      "image":image,
      "id":key,
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
