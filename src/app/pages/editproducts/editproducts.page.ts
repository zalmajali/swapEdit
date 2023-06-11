import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File,Entry } from '@awesome-cordova-plugins/file/ngx';
import { IonInfiniteScroll } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { PickerController } from '@ionic/angular';
import {StoresService} from "../../services/stores.service";
import {ShowimageComponent} from "../showimage/showimage.component";
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.page.html',
  styleUrls: ['./editproducts.page.scss'],
})
export class EditproductsPage implements OnInit {
  public operationResult:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public returnData:any;
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catId:any;
  public points:any;
  public type:any;
  public email:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public isdisabled:boolean=true;
  public cityId:any=0;
  public errorCity:any="";
  public isErrorCity:any = 1;
  public regionId:any=0;
  public errorRegion:any="";
  public isErrorRegion:any = 1;
  public returnRegionsData:any;
  public returnArrayRegionsFromServer:any;
  public returnRegionsArray:any = [];
  public title:any;
  public errorTitle:any="";
  public isErrorTitle:any = 1;
  public serviceDetails:any;
  public errorServiceDetails:any="";
  public isErrorServiceDetails:any = 1;
  public countryId:any;
  public returnDataUser:any;
  public returnCitysData:any;
  public returnArrayCitysFromServer:any;
  public returnCitysArray:any = [];
  public typeOp:any;
  public subCatOp:any;
  public catOp:any;
  public productPoint:any;
  public errorPoints:any="";
  public isErrorPoints:any = 1;
  public message:any;
  public returnCategoriesData:any;
  public returnArrayCategoriesFromServer:any;
  public returnCategoriesArray:any = [];
  public catIdPro:any=0;
  public errorCat:any="";
  public isErrorCat:any = 1;
  public subCatIdPro:any=0;
  public errorSubCat:any="";
  public isErrorSubCat:any = 1;
  public returnsubCatData:any;
  public returnArraysubCatFromServer:any;
  public returnsubCatArray:any = [];
  public servicesId:any;
  public returnServicesData:any;
  public image1:any;
  public image3:any;
  public image2:any;
  public countryIdPro:any;
  public firstImageArray:any;
  public secondImageArray:any;
  public thirdImageArray:any;
  public firstImageVal:any;
  public secondImageVal:any;
  public thirdImageVal:any;
  public returnimageTestData:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public accountSelect:any;
  public accountCityPlaceHolder:any;
  public accountCityError:any;
  public accountRegionPlaceHolder:any;
  public accountRegionError:any;
  public adDetailsPlaceHolder:any;
  public accountDetaleError:any;
  public add:any;
  public serviceDetailsNew:any;
  public titleError:any;
  public titlePlaceHolder:any;
  public arrowSideTow:any;
  public maintenanceServices:any;
  public products:any;
  public addTitle:any;
  public placeHolderPoints:any;
  public errorPointsMsg:any;
  public errorEditProductOne:any;
  public errorEditProductTow:any;
  public next:any;
  public category:any;
  public selectCategory:any;
  public subCategory:any;
  public selectSubCategory:any;
  public editTitle:any;
  public informationMsgOne:any;
  public informationMsgTow:any;
  public selectValData:any;

  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private webview: WebView,private pickerCtrl: PickerController,private modalController: ModalController,private globalization: Globalization,private storesService : StoresService, private translate: TranslateService,private file: File,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private imagePicker: ImagePicker,private transfer: FileTransfer,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','information');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
  }
  async showImage(image:any){
    let model = await this.modalController.create({
      component:ShowimageComponent,
      animated:true,
      componentProps:{image:image},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
    });
    await model.present();
  }
  initialiseTranslation(){
    this.translate.get('selectValData').subscribe((res: string) => {
      this.selectValData = res;
    });
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
    this.translate.get('accountSelect').subscribe((res: string) => {
      this.accountSelect = res;
    });
    this.translate.get('accountRegionPlaceHolder').subscribe((res: string) => {
      this.accountRegionPlaceHolder = res;
    });
    this.translate.get('accountCityPlaceHolder').subscribe((res: string) => {
      this.accountCityPlaceHolder = res;
    });
    this.translate.get('accountCityError').subscribe((res: string) => {
      this.accountCityError = res;
    });
    this.translate.get('accountRegionError').subscribe((res: string) => {
      this.accountRegionError = res;
    });
    this.translate.get('adDetailsPlaceHolder').subscribe((res: string) => {
      this.adDetailsPlaceHolder = res;
    });
    this.translate.get('accountDetaleError').subscribe((res: string) => {
      this.accountDetaleError = res;
    });
    this.translate.get('save').subscribe((res: string) => {
      this.add = res;
    });
    this.translate.get('titleError').subscribe((res: string) => {
      this.titleError = res;
    });
    this.translate.get('titlePlaceHolder').subscribe((res: string) => {
      this.titlePlaceHolder = res;
    });
    this.translate.get('arrowSideTow').subscribe((res: string) => {
      this.arrowSideTow = res;
    });
    this.translate.get('maintenanceServices').subscribe((res: string) => {
      this.maintenanceServices = res;
    });
    this.translate.get('products').subscribe((res: string) => {
      this.products = res;
    });
    this.translate.get('addTitle').subscribe((res: string) => {
      this.addTitle = res;
    });
    this.translate.get('placeHolderPoints').subscribe((res: string) => {
      this.placeHolderPoints = res;
    });
    this.translate.get('errorPointsMsg').subscribe((res: string) => {
      this.errorPointsMsg = res;
    });
    this.translate.get('errorEditProductOne').subscribe((res: string) => {
      this.errorEditProductOne = res;
    });
    this.translate.get('errorEditProductTow').subscribe((res: string) => {
      this.errorEditProductTow = res;
    });
    this.translate.get('category').subscribe((res: string) => {
      this.category = res;
    });
    this.translate.get('selectCategory').subscribe((res: string) => {
      this.selectCategory = res;
    });
    this.translate.get('subCategory').subscribe((res: string) => {
      this.subCategory = res;
    });
    this.translate.get('selectSubCategory').subscribe((res: string) => {
      this.selectSubCategory = res;
    });
    this.translate.get('editTitle').subscribe((res: string) => {
      this.editTitle = res;
    });
    this.translate.get('informationMsgOne').subscribe((res: string) => {
      this.informationMsgOne = res;
    });
    this.translate.get('informationMsgTow').subscribe((res: string) => {
      this.informationMsgTow = res;
    });
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
  uploadeFirstFile(){
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){
      let  options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.image1 = 'data:image/jpeg;base64,' + results[0];
        this.firstImageArray = results[0];
        this.image1 = this.webview.convertFileSrc(this.firstImageArray)
        const arraySplit = this.firstImageArray.split("/tmp/");
        this.firstImageVal = arraySplit[1];
        this.message =this.informationMsgOne;
        this.displayResult(this.message);
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }else{
      let  options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.file.resolveLocalFilesystemUrl(results[0]).then(async (entry:Entry)=>{
          this.firstImageArray = entry.nativeURL;
          this.image1 = this.webview.convertFileSrc(this.firstImageArray)
          this.firstImageVal = entry.name;
          this.message = this.informationMsgOne;
          this.displayResult(this.message);
        })
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }
  }
  uploadeSecondFile(){
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){
      let  options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.image2 = 'data:image/jpeg;base64,' + results[0];
        this.secondImageArray = results[0];
        this.image2 = this.webview.convertFileSrc(this.secondImageArray)
        const arraySplit = this.secondImageArray.split("/tmp/");
        this.secondImageVal = arraySplit[1];
        this.message =this.informationMsgOne;
        this.displayResult(this.message);
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }else{
      let  options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.file.resolveLocalFilesystemUrl(results[0]).then((entry:Entry)=>{
          this.secondImageArray = entry.nativeURL;
          this.secondImageVal = entry.name;
          this.image2 = this.webview.convertFileSrc(this.secondImageArray)
          this.message =this.informationMsgOne;
          this.displayResult(this.message);
        })
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }
  }
  uploadeThirdFile(){
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){
      let  options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.image3 = 'data:image/jpeg;base64,' + results[0];
        this.thirdImageArray = results[0];
        this.image3 = this.webview.convertFileSrc(this.thirdImageArray);
        const arraySplit = this.thirdImageArray.split("/tmp/");
        this.thirdImageVal = arraySplit[1];
        this.message =this.informationMsgOne;
        this.displayResult(this.message);
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }else {
      let options = {
        maximumImagesCount: 1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.image3 = 'data:image/jpeg;base64,' + results[0];
        this.file.resolveLocalFilesystemUrl(results[0]).then((entry: Entry) => {
          this.thirdImageArray = entry.nativeURL;
          this.thirdImageVal = entry.name;
          this.image3 = this.webview.convertFileSrc(this.thirdImageArray);
          this.message =this.informationMsgOne;
          this.displayResult(this.message);
        })
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }
  }
  async selectCatValues(event:any,type:any=0){
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(type == 0)
      this.catIdPro = event.target.value;
    else
      this.catIdPro = event;
    this.errorCat = "";
    this.isErrorCat = 1;
    await this.categoriesService.productsSubCat(this.catIdPro).then(data=>{
      this.returnsubCatData = data;
      this.operationResult = this.returnsubCatData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnsubCatArray=[];
        this.returnArraysubCatFromServer = this.returnsubCatData.Data.subCat;
        for(let i = 0; i < this.returnArraysubCatFromServer.length;i++) {
          this.returnsubCatArray[i]=[];
          this.returnsubCatArray[i]['id'] = this.returnArraysubCatFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage
            if(this.language == "en"){
              this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_en;
            }
            else{
              this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_ar;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en"){
                this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_en;
              }
              else{
                this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_ar;
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
                  this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_en;
                }
                else{
                  this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
    this.isEnterAllValues();
  }
  selectSubCatValues(event:any){
    this.subCatIdPro = event.target.value;
    this.errorSubCat = "";
    this.isErrorSubCat = 1;
    this.isEnterAllValues();
  }
  async selectCityValues(event:any,type:any=0){
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(type==0)
      this.cityId = event.target.value;
    else
      this.cityId = event;
    this.errorCity = "";
    this.isErrorCity = 1;
    await this.categoriesService.regions(this.cityId).then(data=>{
      this.returnRegionsData = data;
      this.operationResult = this.returnRegionsData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnRegionsArray=[];
        this.returnArrayRegionsFromServer = this.returnRegionsData.Data.regions;
        for(let i = 0; i < this.returnArrayRegionsFromServer.length;i++) {
          this.returnRegionsArray[i]=[];
          this.returnRegionsArray[i]['id'] = this.returnArrayRegionsFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en"){
              this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
            }
            else{
              this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en"){
                this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
              }
              else{
                this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
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
                  this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
                }
                else{
                  this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
    this.isEnterAllValues();
  }
  checkTitle(event:any){
    this.errorTitle = "succsessFiled";
    this.isErrorTitle = 1;
    this.title = event.target.value;
    if(this.title == "" || this.title == undefined){
      this.errorTitle = "errorFiled";
      this.isErrorTitle = 0;
    }
    this.isEnterAllValues();
  }
  checkPoints(event:any){
    this.errorPoints = "succsessFiled";
    this.isErrorPoints = 1;
    this.productPoint = event.target.value;
    if(this.productPoint == "" || this.productPoint == undefined){
      this.errorPoints = "errorFiled";
      this.isErrorPoints = 0;
    }
    this.isEnterAllValues();
  }
  checkServiceDetails(event:any){
    this.errorServiceDetails = "succsessFiled";
    this.isErrorServiceDetails = 1;
    this.serviceDetails = event.target.value;
    if(this.serviceDetails == "" || this.serviceDetails == undefined){
      this.errorServiceDetails = "errorFiled";
      this.isErrorServiceDetails = 0;
    }
    this.isEnterAllValues();
  }
  selectRegionValues(event:any){
    this.regionId = event.target.value;
    this.errorRegion = "";
    this.isErrorRegion = 1;
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.title != undefined && this.title != "" || this.title != null && this.productPoint != "" || this.productPoint != null && this.cityId != 0 && this.regionId != 0 && this.serviceDetails != undefined && this.serviceDetails != ""){
      this.isdisabled = true;
    }
  }
  async ngOnInit(loder:any=0) {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    this.countryId = await this.storage.get('countryId');
    await this.getDeviceLanguage();
    if(loder == 0){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 4000,
      });
      await loading.present();
    }
    this.activaterouter.params.subscribe((params:any) => {
      if(params['type']!="" && params['type']!=null && params['type']!=undefined && params['type']!=0)
        this.typeOp = params['type'];
      if(params['servicesId']!="" && params['servicesId']!=null && params['servicesId']!=undefined && params['servicesId']!=0)
        this.servicesId = params['servicesId'];
    });
    await this.storesService.servicesDetails(this.servicesId).then(async data=>{
      this.returnServicesData = data;
      this.operationResult = this.returnServicesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.title = this.returnServicesData.Data.title;
        this.productPoint = this.returnServicesData.Data.points;
        this.image1 = this.returnServicesData.Data.image1;
        this.image2 = this.returnServicesData.Data.image2;
        this.image3 = this.returnServicesData.Data.image3;
        if(this.image1 == null || this.image1 == 0 || this.image1 == undefined)
          this.image1 = "";
        if(this.image2 == null || this.image2 == 0 || this.image2 == undefined)
          this.image2 = "";
        if(this.image3 == null || this.image3 == 0 || this.image3 == undefined)
          this.image3 = "";
        this.serviceDetails = this.returnServicesData.Data.serviceDetails;
        this.catIdPro = this.returnServicesData.Data.catId;
        this.subCatIdPro = this.returnServicesData.Data.subCatId;
        this.cityId = this.returnServicesData.Data.cityId;
        this.countryIdPro = this.returnServicesData.Data.countryId;
        this.regionId = this.returnServicesData.Data.regionsId;
      }
    });
    await this.categoriesService.citys(this.countryId).then(data=>{
      this.returnCitysData = data;
      this.operationResult = this.returnCitysData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCitysFromServer = this.returnCitysData.Data.citys;
        for(let i = 0; i < this.returnArrayCitysFromServer.length;i++) {
          this.returnCitysArray[i]=[];
          this.returnCitysArray[i]['id'] = this.returnArrayCitysFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en"){
              this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
            }
            else{
              this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
            }
          }
          else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en"){
                this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
              }
              else{
                this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
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
                  this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
                }
                else{
                  this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
    await this.categoriesService.productsCategories(this.typeOp).then(data=>{
      this.returnCategoriesData = data;
      this.operationResult = this.returnCategoriesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCategoriesFromServer = this.returnCategoriesData.Data.categories;
        for(let i = 0; i < this.returnArrayCategoriesFromServer.length;i++) {
          this.returnCategoriesArray[i]=[];
          this.returnCategoriesArray[i]['id'] = this.returnArrayCategoriesFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en")
              this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
            else
              this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en")
                this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
              else
                this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if (Val[0])
                  this.language = Val[0];
                else
                  this.language = 'en';
                if(this.language == "en")
                  this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_en;
                else
                  this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title_ar;
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
    await this.selectCityValues(this.cityId,1);
    await this.selectCatValues(this.catIdPro,1);
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
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
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
      }else{
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
    }).catch(e=>{
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
    })
    this.notifications();
  }
  functionGoBack(){
    this.navCtrl.navigateRoot("/advertisements");
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
  async editProduct(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.catIdPro == 0 && this.subCatIdPro == 0 &&  this.cityId == 0 && this.regionId == 0 && (this.title == undefined || this.title == "" || this.title == null) && (this.serviceDetails == undefined || this.serviceDetails == "" || this.serviceDetails == null) && (this.productPoint == undefined || this.productPoint == "" || this.productPoint == null)){
      this.errorCity = "errorFiled";
      this.isErrorCity = 0;
      this.errorRegion = "errorFiled";
      this.isErrorRegion = 0;
      this.errorTitle = "errorFiled";
      this.isErrorTitle = 0;
      this.errorServiceDetails = "errorFiled";
      this.isErrorServiceDetails = 0;
      this.errorPoints = "errorFiled";
      this.isErrorPoints = 0;
      this.errorSubCat = "errorFiled";
      this.isErrorSubCat = 0;
      this.errorCat = "errorFiled";
      this.isErrorCat = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.catIdPro == 0){
      this.errorCat = "errorFiled";
      this.isErrorCat = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.subCatIdPro == 0){
      this.errorCity = "errorFiled";
      this.isErrorCity = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.cityId == 0){
      this.errorCity = "errorFiled";
      this.isErrorCity = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.regionId == 0){
      this.errorRegion = "errorFiled";
      this.isErrorRegion = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.title == undefined || this.title == "" || this.title == null){
      this.errorTitle = "errorFiled";
      this.isErrorTitle = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.productPoint == undefined || this.productPoint == "" || this.productPoint == null){
      this.errorPoints = "errorFiled";
      this.isErrorPoints = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.serviceDetails == undefined || this.serviceDetails == "" || this.serviceDetails == null){
      this.errorServiceDetails = "errorFiled";
      this.isErrorServiceDetails = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.catIdPro != 0 && this.subCatIdPro != 0 && this.cityId != 0 && this.regionId != 0 && this.title != undefined && this.serviceDetails != undefined && this.productPoint != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      await loading.present();
      this.serviceDetailsNew = this.serviceDetails
      var match = /\r|\n/.exec(this.serviceDetails);
      if (match) {
        this.serviceDetailsNew = this.serviceDetails.replaceAll(/\r|\n/ig, " swapkozeyad ");
      }
      await this.usersService.editProduct(this.userId,this.catIdPro,this.subCatIdPro,this.title,this.cityId,this.regionId,this.serviceDetailsNew,this.productPoint,this.servicesId).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          let id = this.returnData.Error.id;
          const fileTransfer: FileTransferObject = this.transfer.create();
          if(this.firstImageArray!=undefined && this.firstImageArray!=null && this.firstImageArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.firstImageArray,
              mimeType:'image/jpg',
              chunkedMode:true,
              headers: {}
            }
            fileTransfer.upload(this.firstImageArray, 'https://admin.eswapco.com/api2/addImagesProduct/'+this.servicesId+"/1", options)
              .then((dataFile) => {
              }, (err) => {
              })
          }
          if(this.secondImageArray!=undefined && this.secondImageArray!=null && this.secondImageArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.secondImageArray,
              mimeType:'image/jpg',
              chunkedMode:true,
              headers: {}
            }
            fileTransfer.upload(this.secondImageArray, 'https://admin.eswapco.com/api2/addImagesProduct/'+this.servicesId+"/2", options)
              .then((data) => {
              }, (err) => {
              })
          }
          if(this.thirdImageArray!=undefined && this.thirdImageArray!=null && this.thirdImageArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.thirdImageArray,
              mimeType:'image/jpg',
              chunkedMode:true,
              headers: {}
            }
            fileTransfer.upload(this.thirdImageArray, 'https://admin.eswapco.com/api2/addImagesProduct/'+this.servicesId+"/3", options)
              .then((data) => {
              }, (err) => {
              })
          }

          this.navCtrl.navigateRoot(['/productsaddsuccess', {type:2}]);
        }else if(this.operationResult==2){
          this.message = this.errorEditProductOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.errorEditProductTow;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.errorEditProductTow;
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
    return true;
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
