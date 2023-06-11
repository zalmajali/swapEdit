import { Component } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File,FileEntry,Entry } from '@awesome-cordova-plugins/file/ngx';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public foreFileArray:any;
  public message:any;
  public firstFileArray:any;
  public foreFileVal:any;
  constructor(private file: File,private imagePicker: ImagePicker,private toastCtrl: ToastController,private transfer: FileTransfer,private platform: Platform) {}
  uploadeForeFile(){
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){
      let  options = {
        maximumImagesCount:1,
      };
      this.imagePicker.getPictures(options).then((results) => {
        this.foreFileArray = results[0];
        const arraySplit = this.foreFileArray.split("/tmp/");
        this.foreFileVal = arraySplit[1];
        this.message = "1تم تحميل ملف الصورة بنجاح";
        this.displayResult(this.message);
      }, (err) => {
        this.message = "2لم يتم تحميل ملف الصورة بنجاح";
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
          this.message = "تم تحميل ملف الصورة بنجاح";
          this.displayResult(this.message);
        }).catch((errrsss:any)=>{
          alert(JSON.stringify(errrsss))
          this.message = "لم يتم تحميل ملف الصورة بنجاح12311";
          this.displayResult(this.message);
        })
      }, (err) => {
        alert(JSON.stringify(err))
        this.message = "sadasdasdasd";
        this.displayResult(this.message);
      });
    }
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

}
