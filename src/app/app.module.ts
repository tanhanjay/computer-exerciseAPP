import { SocialSharing } from '@ionic-native/social-sharing';
import { DbService } from './../providers/db.service';
import { ItemDataService } from './../providers/item-data.service';
import { UserInfoService } from './../providers/user-info.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NewsPage } from '../pages/news/news';
import { MePage } from '../pages/me/me';
import { ExercisePage } from '../pages/exercise/exercise';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from "@ionic/storage";
import { ImagePicker } from '@ionic-native/image-picker';
@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    MePage,
    ExercisePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    MePage,
    ExercisePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserInfoService,
    ItemDataService,
    ImagePicker,
    InAppBrowser,
    DbService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialSharing
  ]
})
export class AppModule {}
