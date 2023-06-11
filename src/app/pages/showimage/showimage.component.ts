import { Component, OnInit,Input } from '@angular/core';
import {ModalController, Platform,NavController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.scss'],
})
export class ShowimageComponent  implements OnInit {
  @Input() image: string | any;
  constructor(private globalization: Globalization, private translate: TranslateService,private storage: Storage,private activaterouter : ActivatedRoute,private navCtrl: NavController,private router : Router,private modalController: ModalController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  ngOnInit() {}
  closeModel(){
    this.modalController.dismiss({
    });
  }
}
