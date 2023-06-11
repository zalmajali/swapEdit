import { NgModule,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FirebaseMessaging } from '@awesome-cordova-plugins/firebase-messaging/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {CountriesComponent} from "./pages/countries/countries.component";
import {ServicesfilterComponent} from "./pages/servicesfilter/servicesfilter.component";
import {SearchfilterComponent} from "./pages/searchfilter/searchfilter.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {ShowimageComponent} from "./pages/showimage/showimage.component";
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [AppComponent,CountriesComponent,ServicesfilterComponent,SearchfilterComponent,CalendarComponent,ShowimageComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Globalization,FirebaseMessaging,FileTransfer,WebView,File,FilePath,ImagePicker,Network,CallNumber,StatusBar,SocialSharing,Clipboard,InAppBrowser],
  bootstrap: [AppComponent,CountriesComponent,ServicesfilterComponent,SearchfilterComponent,CalendarComponent,ShowimageComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
