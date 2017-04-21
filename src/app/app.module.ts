import { DeviceInfoService } from './../services/device-info.service';
import { UserInfoService } from './../services/user-info.service';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NewsPage } from '../pages/news/news';
import { AchievePage } from '../pages/achieve/achieve';
import { ExercisePage } from '../pages/exercise/exercise';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    AchievePage,
    ExercisePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    AchievePage,
    ExercisePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DeviceInfoService,
    UserInfoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
