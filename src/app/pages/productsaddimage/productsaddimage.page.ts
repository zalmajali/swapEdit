import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
import {ShowimageComponent} from "../showimage/showimage.component";
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
@Component({
  selector: 'app-productsaddimage',
  templateUrl: './productsaddimage.page.html',
  styleUrls: ['./productsaddimage.page.scss'],
})
export class ProductsaddimagePage implements OnInit {
  public image1Replase:SafeUrl | any=0;
  public speshalUrl: SafeUrl | any;
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
  public returnDataUser:any;
  public typeOp:any;
  public subCatOp:any;
  public catOp:any;
  public serviceId:any;
  public message:any;
  public firstImageArray:any;
  public secondImageArray:any;
  public thirdImageArray:any;
  public firstImageVal:any;
  public secondImageVal:any;
  public thirdImageVal:any;
  public image2Replase:any=0;
  public image3Replase:any=0;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public add:any;
  public serviceDetailsNew:any;
  public arrowSideTow:any;
  public maintenanceServices:any;
  public products:any;
  public addTitle:any;
  public next:any;
  public informationMsgOne:any;
  public informationMsgTow:any;
  public addImageTo:any;
  public showAddImage:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private webview: WebView,private pickerCtrl: PickerController,private modalController: ModalController, private sanitizer: DomSanitizer,private globalization: Globalization, private translate: TranslateService,private file: File,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private imagePicker: ImagePicker,private transfer: FileTransfer,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
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
    this.translate.get('saveAndSend').subscribe((res: string) => {
      this.add = res;
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
    this.translate.get('informationMsgOne').subscribe((res: string) => {
      this.informationMsgOne = res;
    });
    this.translate.get('informationMsgTow').subscribe((res: string) => {
      this.informationMsgTow = res;
    });
    this.translate.get('addImageTo').subscribe((res: string) => {
      this.addImageTo = res;
    });
    this.translate.get('showAddImage').subscribe((res: string) => {
      this.showAddImage = res;
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
        this.firstImageArray = results[0];
        this.image1Replase = this.webview.convertFileSrc(this.firstImageArray);
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
        this.file.resolveLocalFilesystemUrl(results[0]).then((entry:Entry)=>{
          this.firstImageArray = entry.nativeURL;
          this.image1Replase = this.webview.convertFileSrc(this.firstImageArray);
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
        this.secondImageArray = results[0];
        this.image2Replase = this.webview.convertFileSrc(this.secondImageArray);
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
          this.image2Replase = this.webview.convertFileSrc(this.secondImageArray);
          this.secondImageVal = entry.name;
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
        this.thirdImageArray = results[0];
        const arraySplit = this.thirdImageArray.split("/tmp/");
        this.image3Replase = this.webview.convertFileSrc(this.thirdImageArray);
        this.thirdImageVal = arraySplit[1];
        this.message =this.informationMsgOne;
        this.displayResult(this.message);
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }else {
      let options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.file.resolveLocalFilesystemUrl(results[0]).then((entry: Entry) => {
          this.thirdImageArray = entry.nativeURL;
          this.thirdImageVal = entry.name;
          this.image3Replase = this.webview.convertFileSrc(this.thirdImageArray);
          this.message =this.informationMsgOne;
          this.displayResult(this.message);
        })
      }, (err) => {
        this.message = this.informationMsgTow;
        this.displayResult(this.message);
      });
    }
  }
  async ngOnInit(loder:any=0) {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    await this.getDeviceLanguage();
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
    this.activaterouter.params.subscribe((params:any) => {
      if(params['type']!="" && params['type']!=null && params['type']!=undefined && params['type']!=0)
        this.typeOp = params['type'];
      if(params['catId']!="" && params['catId']!=null && params['catId']!=undefined && params['catId']!=0)
        this.catOp = params['catId'];
      if(params['subCatId']!="" && params['subCatId']!=null && params['subCatId']!=undefined && params['subCatId']!=0)
        this.subCatOp = params['subCatId'];
      if(params['serviceId']!="" && params['serviceId']!=null && params['serviceId']!=undefined && params['serviceId']!=0)
        this.serviceId = params['serviceId'];
    });
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
  async functionGoBack(){
    await this.usersService.deleteProduct(this.userId,this.serviceId).then(async data=>{
    });
    this.navCtrl.navigateRoot(['/getsubcatproorser', {catId:this.catOp,subCatId:this.subCatOp,type:this.typeOp}]);
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
  async addimages(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    const fileTransfer: FileTransferObject = this.transfer.create();
    if(this.firstImageArray!=undefined && this.firstImageArray!=null && this.firstImageArray!=""){
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName:this.firstImageArray,
        mimeType:'image/jpg',
        chunkedMode:true,
        headers: {}
      }
      fileTransfer.upload(this.firstImageArray, 'https://admin.eswapco.com/api2/addImagesProduct/'+this.serviceId+"/1", options)
        .then((data) => {
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
      fileTransfer.upload(this.secondImageArray, 'https://admin.eswapco.com/api2/addImagesProduct/'+this.serviceId+"/2", options)
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
      fileTransfer.upload(this.thirdImageArray, 'https://admin.eswapco.com/api2/addImagesProduct/'+this.serviceId+"/3", options)
        .then((data) => {
        }, (err) => {
        })
    }
    this.navCtrl.navigateRoot(['/productsaddsuccess', {type:1}]);
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
