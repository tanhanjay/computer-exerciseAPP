import { UserInfoService } from './../providers/user-info.service';
import { ItemDataService } from './../providers/item-data.service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/toPromise';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public storage:Storage,private http:Http,
  private itemDataService:ItemDataService,public userInfoServic:UserInfoService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.storage.get('hasUsed').then((hasUsed)=>{
      //   if(hasUsed){
      //     this.deviceInfoService.hasUsed = true;
          
      //   }else{
      //     this.deviceInfoService.hasUsed = false;
      //     this.storage.set('hasUsed',true);
      //     this.itemDataService.updateTestItem();
      //   }
      // });
    });
  }
}
