import { DeviceInfoService } from './../../services/device-info.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInfoService } from "../../services/user-info.service";
@Component({
  selector: 'page-contact',
  templateUrl: 'achieve.html'
})
export class AchievePage {
  
  constructor(public navCtrl: NavController,private userInfoService:UserInfoService,private deviceInfoService:DeviceInfoService) {
    this.userInfoService.getUserInfo().then((userInfo)=>{this.name = userInfo.name});
    if(this.deviceInfoService.hasUsed){
      this.hasUsed = "用过";
    }else{
      this.hasUsed="从未用过";
    }
  }
  name :string;
  hasUsed:string;

}
