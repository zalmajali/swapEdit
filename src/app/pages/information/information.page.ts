import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {LoadingController, MenuController, NavController,ModalController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File,Entry } from '@awesome-cordova-plugins/file/ngx';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {CalendarComponent} from "../calendar/calendar.component";
@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  public typeWork:any=1;
  public selectClassOne:any="categoriesHomeCardSelect";
  public selectClassTow:any="categoriesHomeCardUnSelect";
  public operationResult:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public iconValues = "chevron-back-outline";
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
  public returnCitysData:any;
  public returnArrayCitysFromServer:any;
  public returnCitysArray:any = [];
  public returnCategoriesData:any;
  public returnArrayCategoriesFromServer:any;
  public returnCategoriesArray:any = [];
  public returnsubCatData:any;
  public returnArraysubCatFromServer:any;
  public returnsubCatArray:any = [];
  public catIdUser:any=0;
  public errorCat:any="";
  public isErrorCat:any = 1;
  public isdisabled:boolean=true;
  public subCatIdUser:any=0;
  public errorSubCat:any="";
  public isErrorSubCat:any = 1;
  public cityId:any=0;
  public errorCity:any="";
  public isErrorCity:any = 1;
  public regionId:any=0;
  public errorRegion:any="";
  public isErrorRegion:any = 1;
  public returnRegionsData:any;
  public returnArrayRegionsFromServer:any;
  public returnRegionsArray:any = [];
  public userName:any;
  public errorUserName:any="";
  public isErrorUserName:any = 1;
  public commercialName:any;
  public errorCommercialName:any="";
  public isErrorCommercialName:any = 1;
  public serviceDetails:any;
  public errorServiceDetails:any="";
  public isErrorServiceDetails:any = 1;
  public message:any;
  public firstFileArray:any;
  public secondFileArray:any;
  public thirdFileArray:any;
  public firstFileVal:any;
  public secondFileVal:any;
  public thirdFileVal:any;
  public returnDataUser:any;
  public isUpdateInformation:any;
  public foreFileVal:any;
  public foreFileArray:any;
  public serviceDetailsNew:any;
  public errorStatus:any="";
  public isErrorStatus:any = 1;
  public selectStatusUser:any;
  public errorBirthDate:any="";
  public isErrorBirthDate:any = 1;
  public birthDate:any;
  public sex:any = 1;
  public countryId:any;
  public typeUser:any;
  public errorTypeWork:any="";
  public isErrorTypeWork:any = 1;
  public typeWorkVal:any;
  public employeeCount:any;
  public errorEmployeeCount:any="";
  public isErrorEmployeeCount:any = 1;
  public fullYear:any=[];
  public fullMonth:any=[];
  public fullDay:any=[];
  public barthDateSelect:any;
  public classOne:any;
  public classTow:any;
  public classThree:any;
  public sizeOne:any;
  public sizeTow:any;

  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public userTypeTitle:any;
  public userTypeSelect:any;
  public titleData:any;
  public titleSubData:any;
  public titleSubSubData:any;
  public informationCommercialImage:any;
  public userTypeTitleOne:any;
  public userTypeSubTitleOne:any;
  public userTypeSubSubTitleOne:any;
  public userTypeTitleTow:any;
  public userTypeSubTitleTow:any;
  public userTypeSubSubTitleTow:any;
  public userTypeTitleThree:any;
  public userTypeSubSubTitleThree:any;
  public userTypeTitleFor:any;
  public userTypeSubSubTitleFor:any;
  public accountUplode:any;
  public informationNamePlaceHolder:any;
  public informationNameError:any;
  public informationCommercialPlaceHolder:any;
  public informationCommercialError:any;
  public informationCommercial:any;
  public informationCatPlaceHolder:any;
  public informationCatError:any;
  public informationSubCatPlaceHolder:any;
  public informationSubCatError:any;
  public accountSelect:any;
  public informationCityPlaceHolder:any;
  public informationCityError:any;
  public informationRegionPlaceHolder:any;
  public informationRegionError:any;
  public mail:any;
  public FeMail:any;
  public selectStatusePlacholder:any;
  public statuseValuseOne:any;
  public statuseValuseTow:any;
  public statuseValuseThree:any;
  public statuseValusefore:any;
  public profilePicturePlacholder:any;
  public selectStatuseError:any;
  public informationBirthDatePlaceHolder:any;
  public informationBirthDateError:any;
  public selectTypeWorkPlacholder:any;
  public selectTypeWorkError:any;
  public employer:any;
  public employee:any;
  public selectEmployeeCountPlacholder:any;
  public selectEmployeeCountError:any;
  public previous:any;
  public finished:any;
  public day:any;
  public month:any;
  public year:any;
  public no:any;
  public yas:any;
  public jobTitleType:any;
  public jobsubTitleType:any;
  public selectValData:any;
  public informationTitle:any;
  public informationNote:any;
  public informationAddImage:any;
  public informationFree:any;
  public informationImagePlaceHolder:any;
  public informationDetalisPlaceHolder:any;
  public informationDetalisError:any;
  public informationEdit:any;
  public informationMsgOne:any;
  public informationMsgTow:any;
  public informationMsgThree:any;
  public informationMsgFor:any;
  public informationMsgFive:any;
  public myInformation:any;
  constructor(private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private activaterouter : ActivatedRoute,private file: File,private toastCtrl: ToastController,private imagePicker: ImagePicker,private transfer: FileTransfer,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','information');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
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
    this.translate.get('informationNamePlaceHolder').subscribe((res: string) => {
      this.informationNamePlaceHolder = res;
    });
    this.translate.get('informationNameError').subscribe((res: string) => {
      this.informationNameError = res;
    });
    this.translate.get('userTypeTitleOne').subscribe((res: string) => {
      this.userTypeTitleOne = res;
    });
    this.translate.get('userTypeSubTitleOne').subscribe((res: string) => {
      this.userTypeSubTitleOne = res;
    });
    this.translate.get('userTypeSubSubTitleOne').subscribe((res: string) => {
      this.userTypeSubSubTitleOne = res;
    });
    this.translate.get('userTypeTitleTow').subscribe((res: string) => {
      this.userTypeTitleTow = res;
    });
    this.translate.get('userTypeSubTitleTow').subscribe((res: string) => {
      this.userTypeSubTitleTow = res;
    });
    this.translate.get('userTypeSubSubTitleTow').subscribe((res: string) => {
      this.userTypeSubSubTitleTow = res;
    });
    this.translate.get('userTypeTitleThree').subscribe((res: string) => {
      this.userTypeTitleThree = res;
    });
    this.translate.get('userTypeSubSubTitleThree').subscribe((res: string) => {
      this.userTypeSubSubTitleThree = res;
    });
    this.translate.get('userTypeTitleFor').subscribe((res: string) => {
      this.userTypeTitleFor = res;
    });
    this.translate.get('userTypeSubSubTitleFor').subscribe((res: string) => {
      this.userTypeSubSubTitleFor = res;
    });
    this.translate.get('informationAddImage').subscribe((res: string) => {
      this.informationAddImage = res;
    });
    this.translate.get('informationCommercial').subscribe((res: string) => {
      this.informationCommercial = res;
    });
    this.translate.get('informationCommercialImage').subscribe((res: string) => {
      this.informationCommercialImage = res;
    });
    this.translate.get('accountUplode').subscribe((res: string) => {
      this.accountUplode = res;
    });
    this.translate.get('informationCommercialPlaceHolder').subscribe((res: string) => {
      this.informationCommercialPlaceHolder = res;
    });
    this.translate.get('informationCommercialError').subscribe((res: string) => {
      this.informationCommercialError = res;
    });
    this.translate.get('userTypeTitle').subscribe((res: string) => {
      this.userTypeTitle = res;
    });
    this.translate.get('userTypeSelect').subscribe((res: string) => {
      this.userTypeSelect = res;
    });
    this.translate.get('informationCatPlaceHolder').subscribe((res: string) => {
      this.informationCatPlaceHolder = res;
    });
    this.translate.get('informationCatError').subscribe((res: string) => {
      this.informationCatError = res;
    });
    this.translate.get('informationSubCatPlaceHolder').subscribe((res: string) => {
      this.informationSubCatPlaceHolder = res;
    });
    this.translate.get('informationSubCatError').subscribe((res: string) => {
      this.informationSubCatError = res;
    });
    this.translate.get('accountSelect').subscribe((res: string) => {
      this.accountSelect = res;
    });
    this.translate.get('informationCityPlaceHolder').subscribe((res: string) => {
      this.informationCityPlaceHolder = res;
    });
    this.translate.get('informationCityError').subscribe((res: string) => {
      this.informationCityError = res;
    });
    this.translate.get('informationRegionPlaceHolder').subscribe((res: string) => {
      this.informationRegionPlaceHolder = res;
    });
    this.translate.get('informationRegionError').subscribe((res: string) => {
      this.informationRegionError = res;
    });
    this.translate.get('mail').subscribe((res: string) => {
      this.mail = res;
    });
    this.translate.get('FeMail').subscribe((res: string) => {
      this.FeMail = res;
    });
    this.translate.get('selectStatusePlacholder').subscribe((res: string) => {
      this.selectStatusePlacholder = res;
    });
    this.translate.get('informationTitle').subscribe((res: string) => {
      this.informationTitle = res;
    });
    this.translate.get('informationNote').subscribe((res: string) => {
      this.informationNote = res;
    });
    this.translate.get('statuseValuseOne').subscribe((res: string) => {
      this.statuseValuseOne = res;
    });
    this.translate.get('statuseValuseTow').subscribe((res: string) => {
      this.statuseValuseTow = res;
    });
    this.translate.get('statuseValuseThree').subscribe((res: string) => {
      this.statuseValuseThree = res;
    });
    this.translate.get('statuseValusefore').subscribe((res: string) => {
      this.statuseValusefore = res;
    });
    this.translate.get('profilePicturePlacholder').subscribe((res: string) => {
      this.profilePicturePlacholder = res;
    });
    this.translate.get('selectStatuseError').subscribe((res: string) => {
      this.selectStatuseError = res;
    });
    this.translate.get('informationBirthDatePlaceHolder').subscribe((res: string) => {
      this.informationBirthDatePlaceHolder = res;
    });
    this.translate.get('informationBirthDateError').subscribe((res: string) => {
      this.informationBirthDateError = res;
    });
    this.translate.get('selectTypeWorkPlacholder').subscribe((res: string) => {
      this.selectTypeWorkPlacholder = res;
    });
    this.translate.get('selectTypeWorkError').subscribe((res: string) => {
      this.selectTypeWorkError = res;
    });
    this.translate.get('employer').subscribe((res: string) => {
      this.employer = res;
    });
    this.translate.get('employee').subscribe((res: string) => {
      this.employee = res;
    });
    this.translate.get('selectEmployeeCountPlacholder').subscribe((res: string) => {
      this.selectEmployeeCountPlacholder = res;
    });
    this.translate.get('selectEmployeeCountError').subscribe((res: string) => {
      this.selectEmployeeCountError = res;
    });
    this.translate.get('previous').subscribe((res: string) => {
      this.previous = res;
    });
    this.translate.get('finished').subscribe((res: string) => {
      this.finished = res;
    });
    this.translate.get('informationMsgOne').subscribe((res: string) => {
      this.informationMsgOne = res;
    });
    this.translate.get('informationMsgTow').subscribe((res: string) => {
      this.informationMsgTow = res;
    });
    this.translate.get('informationMsgThree').subscribe((res: string) => {
      this.informationMsgThree = res;
    });
    this.translate.get('informationMsgFor').subscribe((res: string) => {
      this.informationMsgFor = res;
    });
    this.translate.get('informationMsgFive').subscribe((res: string) => {
      this.informationMsgFive = res;
    });
    this.translate.get('informationDetalisPlaceHolder').subscribe((res: string) => {
      this.informationDetalisPlaceHolder = res;
    });
    this.translate.get('informationDetalisError').subscribe((res: string) => {
      this.informationDetalisError = res;
    });
    this.translate.get('myInformation').subscribe((res: string) => {
      this.myInformation = res;
    });
    this.translate.get('day').subscribe((res: string) => {
      this.day = res;
    });
    this.translate.get('month').subscribe((res: string) => {
      this.month = res;
    });
    this.translate.get('year').subscribe((res: string) => {
      this.year = res;
    });
    this.translate.get('no').subscribe((res: string) => {
      this.no = res;
    });
    this.translate.get('yas').subscribe((res: string) => {
      this.yas = res;
    });
    this.translate.get('jobTitleType').subscribe((res: string) => {
      this.jobTitleType = res;
    });
    this.translate.get('jobsubTitleType').subscribe((res: string) => {
      this.jobsubTitleType = res;
    });
  }
  async openPicker() {
    let model = await this.modalController.create({
      component:CalendarComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
      this.birthDate = data.data.date;
    });
    await model.present();
  }
  selectTypeWorkValues(event:any){
    this.typeWorkVal = event.target.value;
    this.errorTypeWork = "";
    this.isErrorTypeWork = 1;
    this.isdisabled = true;
  }
  selectEmployeeCountValues(event:any){
    this.employeeCount = event.target.value;
    this.errorEmployeeCount = "";
    this.isErrorEmployeeCount = 1;
    this.isdisabled = true;
  }
  async selectCityValues(event:any){
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    this.cityId = event.target.value;
    this.errorCity = "";
    this.isErrorCity = 1;
    this.categoriesService.regions(this.cityId).then(data=>{
      this.returnRegionsData = data;
      this.operationResult = this.returnRegionsData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnRegionsArray=[];
        this.returnArrayRegionsFromServer = this.returnRegionsData.Data.regions;
        for(let i = 0; i < this.returnArrayRegionsFromServer.length;i++) {
          this.returnRegionsArray[i]=[];
          this.returnRegionsArray[i]['id'] = this.returnArrayRegionsFromServer[i].id;
          this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title;
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en")
              this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
            else
              this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en")
                this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
              else
                this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if (Val[0])
                  this.language = Val[0];
                else
                  this.language = 'en';
                if(this.language == "en")
                  this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_en;
                else
                  this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title_ar;
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
    this.isdisabled = true;
  }
  checkUserName(event:any){
    this.errorUserName = "succsessFiled";
    this.isErrorUserName = 1;
    this.userName = event.target.value;
    if(this.userName == "" || this.userName == undefined){
      this.errorUserName = "errorFiled";
      this.isErrorUserName = 0;
    }
    this.isdisabled = true;
  }
  selectRegionValues(event:any){
    this.regionId = event.target.value;
    this.errorRegion = "";
    this.isErrorRegion = 1;
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
    this.isdisabled = true;
  }
  checkBirthDate(event:any){
    this.errorBirthDate = "succsessFiled";
    this.isErrorBirthDate = 1;
    this.birthDate = event.target.value;
    if(this.birthDate == "" || this.birthDate == undefined){
      this.errorBirthDate = "errorFiled";
      this.isErrorBirthDate = 0;
    }
    this.isdisabled = true;
  }
  functionChangeType(type:any){
    this.sex = type;
    if(type == 1){
      this.typeWork=1;
      this.selectClassOne="categoriesHomeCardSelect"
      this.selectClassTow="categoriesHomeCardUnSelect"
    }else{
      this.typeWork=2;
      this.selectClassOne="categoriesHomeCardUnSelect"
      this.selectClassTow="categoriesHomeCardSelect"
    }
  }
  checkCommercialName(event:any){
    this.errorCommercialName = "succsessFiled";
    this.isErrorCommercialName = 1;
    this.commercialName = event.target.value;
    if(this.commercialName == "" || this.commercialName == undefined){
      this.errorCommercialName = "errorFiled";
      this.isErrorCommercialName = 0;
    }
    this.isdisabled = true;
  }
  async selectCatValues(event:any,type:any=0){
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(type == 0)
      this.catIdUser = event.target.value;
    else
      this.catIdUser = event;
    this.errorCat = "";
    this.isErrorCat = 1;
    await this.categoriesService.subCat(this.catIdUser).then(data=>{
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
    this.isdisabled = true;
  }
  selectSubCatValues(event:any){
    this.subCatIdUser = event.target.value;
    this.errorSubCat = "";
    this.isErrorSubCat = 1;
    this.isdisabled = true;
  }
  selectStatusValues(event:any){
    this.selectStatusUser = event.target.value;
    this.errorStatus = "";
    this.isErrorStatus = 1;
    this.isdisabled = true;
  }
  isEnterAllValues(){
    if(this.catIdUser != 0 && this.subCatIdUser != 0 && this.cityId != 0 && this.regionId != 0 && this.userName != undefined && this.userName != "" && this.commercialName != undefined && this.commercialName != "" && this.serviceDetails != undefined && this.serviceDetails != "" && this.selectStatusUser != undefined && this.selectStatusUser != ""){
      this.isdisabled = true;
    }
  }
  uploadeFirstFile(){
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){
      let  options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.firstFileArray = results[0];
        const arraySplit = this.firstFileArray.split("/tmp/");
        this.firstFileVal = arraySplit[1];
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
          this.firstFileArray = entry.nativeURL;
          this.firstFileVal = entry.name;
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
        this.secondFileArray = results[0];
        const arraySplit = this.secondFileArray.split("/tmp/");
        this.secondFileVal = arraySplit[1];
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
          this.secondFileArray = entry.nativeURL;
          this.secondFileVal = entry.name;
          this.message =this.informationMsgOne;
          this.displayResult(this.message);
        })
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }
  }
  uploadeForeFile(){
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){
      let  options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.foreFileArray = results[0];
        const arraySplit = this.foreFileArray.split("/tmp/");
        this.foreFileVal = arraySplit[1];
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
          this.foreFileArray = entry.nativeURL;
          this.foreFileVal = entry.name;
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
        this.thirdFileArray = results[0];
        const arraySplit = this.thirdFileArray.split("/tmp/");
        this.thirdFileVal = arraySplit[1];
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
        this.file.resolveLocalFilesystemUrl(results[0]).then((entry: Entry) => {
          this.thirdFileArray = entry.nativeURL;
          this.thirdFileVal = entry.name;
          this.message =this.informationMsgOne;
          this.displayResult(this.message);
        })
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }
  }
  async ngOnInit() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    await this.getDeviceLanguage();
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.points = await this.storage.get('points');
    this.countryId = await this.storage.get('countryId');
    if(this.userId == null || this.numberLogin == null){
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
    await this.activaterouter.params.subscribe((params:any) => {
      if(params['typeUser']!="" && params['typeUser']!=null && params['typeUser']!=undefined && params['typeUser']!=0)
        this.typeUser = params['typeUser'];
    });
    if(this.typeUser == 1){
      this.classOne = "titleImageTypeUserOne";
      this.classTow = "textValSubDivOne";
      this.classThree = "typeTextDivOne";
      this.titleData = this.userTypeTitleOne;
      this.titleSubData = this.userTypeSubTitleOne;
      this.titleSubSubData = this.userTypeSubSubTitleOne;
      this.sizeOne=5
      this.sizeTow=7
    }
    if(this.typeUser == 2){
      this.classOne = "titleImageTypeUserTow";
      this.classTow = "textValSubDivTow";
      this.classThree = "typeTextDivTow";
      this.titleData = this.userTypeTitleTow;
      this.titleSubData = this.userTypeSubTitleTow;
      this.titleSubSubData = this.userTypeSubSubTitleTow;
      this.sizeOne=5
      this.sizeTow=7
    }
    if(this.typeUser == 3){
      this.classOne = "titleImageTypeUserThree";
      this.classTow = "textValSubDivThree";
      this.classThree = "typeTextDivThree";
      this.titleData = this.userTypeTitleThree;
      this.titleSubData = "";
      this.titleSubSubData = this.userTypeSubSubTitleThree;
      this.sizeOne=7
      this.sizeTow=5
    }
    if(this.typeUser == 4){
      this.classOne = "titleImageTypeUserFor";
      this.classTow = "textValSubDivFor";
      this.classThree = "typeTextDivFor";
      this.titleData = this.userTypeTitleFor;
      this.titleSubData = "";
      this.titleSubSubData = this.userTypeSubSubTitleFor;
      this.sizeOne=6
      this.sizeTow=6
    }
    this.categoriesService.citys(this.countryId).then(data=>{
      this.returnCitysData = data;
      this.operationResult = this.returnCitysData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCitysFromServer = this.returnCitysData.Data.citys;
        for(let i = 0; i < this.returnArrayCitysFromServer.length;i++) {
          this.returnCitysArray[i]=[];
          this.returnCitysArray[i]['id'] = this.returnArrayCitysFromServer[i].id;
          if(this.checkLanguage){
            this.language = this.checkLanguage;
            if(this.language == "en")
              this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
            else
              this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if (Val[0])
                this.language = Val[0];
              else
                this.language = 'en';
              if(this.language == "en")
                this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
              else
                this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if (Val[0])
                  this.language = Val[0];
                else
                  this.language = 'en';
                if(this.language == "en")
                  this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_en;
                else
                  this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title_ar;
              }).catch(e => {console.log(e);});
            }
          }
        }
      }
    });
    this.categoriesService.categories().then(data=>{
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
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
        this.isUpdateInformation = this.returnDataUser.Data.isUpdateInformation;
        await this.storage.set('isUpdateInformation',this.isUpdateInformation);
        if(this.isUpdateInformation == 1){
          await this.storage.set('isaddInformation',1);
          this.message = this.informationMsgThree;
          this.displayResult(this.message);
          this.navCtrl.navigateRoot('login');
        }
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
    await this.checkIfSiteWork();
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
  async updateData(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','information');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.typeUser == 1){
      if((this.userName == undefined || this.userName == "" || this.userName == null) && this.cityId == 0 && this.regionId == 0 && (this.selectStatusUser == 0 || this.selectStatusUser == undefined) && (this.birthDate == undefined || this.birthDate == "" || this.birthDate == null) && (this.serviceDetails == undefined || this.serviceDetails == "" || this.serviceDetails == null)){
        this.errorCity = "errorFiled";
        this.isErrorCity = 0;
        this.errorRegion = "errorFiled";
        this.isErrorRegion = 0;
        this.errorUserName = "errorFiled";
        this.isErrorUserName = 0;
        this.errorCommercialName = "errorFiled";
        this.isErrorCommercialName = 0;
        this.errorServiceDetails = "errorFiled";
        this.isErrorServiceDetails = 0;
        this.errorBirthDate = "errorFiled";
        this.isErrorBirthDate = 0;
        this.errorStatus = "errorFiled";
        this.isErrorStatus = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.userName == undefined || this.userName == "" || this.userName == null){
        this.errorUserName = "errorFiled";
        this.isErrorUserName = 0;
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
      if(this.selectStatusUser == 0){
        this.errorStatus = "errorFiled";
        this.isErrorStatus = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.birthDate == undefined || this.birthDate == "" || this.birthDate == null){
        this.errorBirthDate = "errorFiled";
        this.isErrorBirthDate = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.serviceDetails == undefined || this.serviceDetails == "" || this.serviceDetails == null){
        this.errorServiceDetails = "errorFiled";
        this.isErrorServiceDetails = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.cityId != 0 && this.regionId != 0 && this.selectStatusUser != 0 && this.userName != undefined && this.birthDate != undefined && this.serviceDetails != undefined){
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
        await this.usersService.updateDataOne(this.userId,this.cityId,this.regionId,this.userName,this.selectStatusUser,this.birthDate,this.serviceDetailsNew,this.sex).then(async data=>{
          this.returnData = data;
          this.operationResult = this.returnData.Error.ErrorCode;
          if(this.operationResult==1){
            await this.storage.set('isaddInformation',1);
            this.message = this.informationMsgThree;
            this.navCtrl.navigateRoot("/awaitingapproval");
            this.displayResult(this.message);
          }else if(this.operationResult==2){
            this.message = this.informationMsgFor;
            this.displayResult(this.message);
          }else if(this.operationResult==3){
            this.message = this.informationMsgFive;
            this.displayResult(this.message);
          }
        }).catch(e=>{
          this.message = this.informationMsgFive;
          this.displayResult(this.message);
        })
        this.isdisabled = true;
      }
    }
    else if(this.typeUser == 2){
      if(this.catIdUser == 0 && this.subCatIdUser == 0 && this.cityId == 0 && this.regionId == 0 && (this.userName == undefined || this.userName == "" || this.userName == null) && (this.birthDate == undefined || this.birthDate == "" || this.birthDate == null) && (this.serviceDetails == undefined || this.serviceDetails == "" || this.serviceDetails == null)){
        this.errorCat = "errorFiled";
        this.isErrorCat = 0;
        this.errorSubCat = "errorFiled";
        this.isErrorSubCat = 0;
        this.errorCity = "errorFiled";
        this.isErrorCity = 0;
        this.errorRegion = "errorFiled";
        this.isErrorRegion = 0;
        this.errorUserName = "errorFiled";
        this.isErrorUserName = 0;
        this.errorCommercialName = "errorFiled";
        this.isErrorCommercialName = 0;
        this.errorServiceDetails = "errorFiled";
        this.isErrorServiceDetails = 0;
        this.errorBirthDate = "errorFiled";
        this.isErrorBirthDate = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.catIdUser == 0){
        this.errorCat = "errorFiled";
        this.isErrorCat = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.subCatIdUser == 0){
        this.errorSubCat = "errorFiled";
        this.isErrorSubCat = 0;
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
      if(this.userName == undefined || this.userName == "" || this.userName == null){
        this.errorUserName = "errorFiled";
        this.isErrorUserName = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.birthDate == undefined || this.birthDate == "" || this.birthDate == null){
        this.errorBirthDate = "errorFiled";
        this.isErrorBirthDate = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.serviceDetails == undefined || this.serviceDetails == "" || this.serviceDetails == null){
        this.errorServiceDetails = "errorFiled";
        this.isErrorServiceDetails = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.catIdUser != 0 && this.subCatIdUser != 0 && this.cityId != 0 && this.regionId != 0 && this.userName != undefined && this.birthDate != undefined && this.serviceDetails != undefined){
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
        await this.usersService.updateDataTow(this.userId,this.catIdUser,this.subCatIdUser,this.cityId,this.regionId,this.userName,this.birthDate,this.serviceDetailsNew,this.sex).then(async data=>{
          this.returnData = data;
          this.operationResult = this.returnData.Error.ErrorCode;
          if(this.operationResult==1){
            const fileTransfer: FileTransferObject = this.transfer.create();
            if(this.thirdFileArray!=undefined && this.thirdFileArray!=null && this.thirdFileArray!=""){
              let options: FileUploadOptions = {
                fileKey: 'file',
                fileName:this.thirdFileArray,
                mimeType:'image/jpg',
                chunkedMode:true,
                headers: {}
              }
              fileTransfer.upload(this.thirdFileArray,  'https://admin.eswapco.com/api2/addImages/'+this.userId+"/1", options)
                .then((data) => {
                }, (err) => {
                })
            }
            await this.storage.set('isaddInformation',1);
            this.message = this.informationMsgThree;
            this.displayResult(this.message);
            this.navCtrl.navigateRoot("/awaitingapproval");
          }else if(this.operationResult==2){
            this.message = this.informationMsgFor;
            this.displayResult(this.message);
          }else if(this.operationResult==3){
            this.message = this.informationMsgFive;
            this.displayResult(this.message);
          }
        }).catch(e=>{
          this.message = this.informationMsgFive;
          this.displayResult(this.message);
        })
        this.isdisabled = true;
      }
    }else if(this.typeUser == 3 || this.typeUser == 4){
      if(this.catIdUser == 0 && this.subCatIdUser == 0 && this.cityId == 0 && this.typeWorkVal == 0 && this.employeeCount == 0 && this.regionId == 0 && (this.userName == undefined || this.userName == "" || this.userName == null) && (this.commercialName == undefined || this.commercialName == "" || this.commercialName == null) && (this.serviceDetails == undefined || this.serviceDetails == "" || this.serviceDetails == null)){
        this.errorCat = "errorFiled";
        this.isErrorCat = 0;
        this.errorSubCat = "errorFiled";
        this.isErrorSubCat = 0;
        this.errorCity = "errorFiled";
        this.isErrorCity = 0;
        this.errorRegion = "errorFiled";
        this.isErrorRegion = 0;
        this.errorUserName = "errorFiled";
        this.isErrorUserName = 0;
        this.errorCommercialName = "errorFiled";
        this.isErrorCommercialName = 0;
        this.errorTypeWork = "errorFiled";
        this.isErrorTypeWork = 0;
        this.errorEmployeeCount = "errorFiled";
        this.isErrorEmployeeCount = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.catIdUser == 0){
        this.errorCat = "errorFiled";
        this.isErrorCat = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.subCatIdUser == 0){
        this.errorSubCat = "errorFiled";
        this.isErrorSubCat = 0;
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
      if(this.typeWorkVal == 0){
        this.errorTypeWork = "errorFiled";
        this.isErrorTypeWork = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.employeeCount == 0){
        this.errorEmployeeCount = "errorFiled";
        this.isErrorEmployeeCount = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.userName == undefined || this.userName == "" || this.userName == null){
        this.errorUserName = "errorFiled";
        this.isErrorUserName = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.commercialName == undefined || this.commercialName == "" || this.commercialName == null){
        this.errorCommercialName = "errorFiled";
        this.isErrorCommercialName = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.serviceDetails == undefined || this.serviceDetails == "" || this.serviceDetails == null){
        this.errorServiceDetails = "errorFiled";
        this.isErrorServiceDetails = 0;
        this.isdisabled = false;
        return false;
      }
      if(this.catIdUser != 0 && this.subCatIdUser != 0 && this.cityId != 0 && this.regionId != 0 && this.typeWorkVal != 0 && this.employeeCount != 0 && this.userName != undefined && this.commercialName != undefined){
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
        await this.usersService.updateData(this.userId,this.catIdUser,this.subCatIdUser,this.cityId,this.regionId,this.userName,this.commercialName,this.typeWorkVal,this.employeeCount,this.serviceDetailsNew,this.typeUser).then(async data=>{
          this.returnData = data;
          this.operationResult = this.returnData.Error.ErrorCode;
          if(this.operationResult==1){
            const fileTransfer: FileTransferObject = this.transfer.create();
            if(this.firstFileArray!=undefined && this.firstFileArray!=null && this.firstFileArray!=""){
              let options: FileUploadOptions = {
                fileKey: 'file',
                fileName:this.firstFileArray,
                mimeType:'image/jpg',
                chunkedMode:true,
                headers: {}
              }
              fileTransfer.upload(this.firstFileArray,  'https://admin.eswapco.com/api2/addImages/'+this.userId+"/2", options)
                .then((data) => {
                }, (err) => {
                })
            }
            if(this.secondFileArray!=undefined && this.secondFileArray!=null && this.secondFileArray!=""){
              let options: FileUploadOptions = {
                fileKey: 'file',
                fileName:this.secondFileArray,
                mimeType:'image/jpg',
                chunkedMode:true,
                headers: {}
              }
              fileTransfer.upload(this.secondFileArray,  'https://admin.eswapco.com/api2/addImages/'+this.userId+"/3", options)
                .then((data) => {
                }, (err) => {
                })
            }
            if(this.thirdFileArray!=undefined && this.thirdFileArray!=null && this.thirdFileArray!=""){
              let options: FileUploadOptions = {
                fileKey: 'file',
                fileName:this.thirdFileArray,
                mimeType:'image/jpg',
                chunkedMode:true,
                headers: {}
              }
              fileTransfer.upload(this.thirdFileArray,  'https://admin.eswapco.com/api2/addImages/'+this.userId+"/1", options)
                .then((data) => {
                }, (err) => {
                })
            }
            await this.storage.set('isaddInformation',1);
            this.message = this.informationMsgThree;
            this.displayResult(this.message);
            this.navCtrl.navigateRoot("/awaitingapproval");
          }else if(this.operationResult==2){
            this.message = this.informationMsgFor;
            this.displayResult(this.message);
          }else if(this.operationResult==3){
            this.message = this.informationMsgFive;
            this.displayResult(this.message);
          }
        }).catch(e=>{
          this.message = this.informationMsgFive;
          this.displayResult(this.message);
        })
        this.isdisabled = true;
      }
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
  ///hear all values
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
  async checkIfSiteWork(){
    this.usersService.checkIfSiteWorkApi().then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult!=1){
        this.navCtrl.navigateRoot("/sitework");
      }
    }).catch(e=>{
      this.navCtrl.navigateRoot("/sitework");
    })
  }
  backToPage(){
    this.navCtrl.navigateRoot("/usertype");
  }
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
