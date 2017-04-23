import { ItemDataService } from './../../providers/item-data.service';
import { DeviceInfoService } from './../../providers/device-info.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInfoService } from "../../providers/user-info.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'me.html'
})
export class MePage {
  
  constructor(public navCtrl: NavController,private userInfoService:UserInfoService,
  private deviceInfoService:DeviceInfoService,public itemDataService:ItemDataService) {
    this.userInfoService.getUserInfo().then((userInfo)=>{this.name = userInfo.name});
    if(this.deviceInfoService.hasUsed){
      this.hasUsed = "用过";
    }else{
      this.hasUsed="从未用过";
    }
  }
  name :string;
  hasUsed:string;
  updateBtnClick(){
    this.itemDataService.updateTestItem();
  }
}
