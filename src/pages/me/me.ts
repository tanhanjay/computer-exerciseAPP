import { UserInfo } from './../../providers/user-info.service';
import { ItemDataService } from './../../providers/item-data.service';
import { DeviceInfoService } from './../../providers/device-info.service';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserInfoService } from "../../providers/user-info.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'me.html'
})
export class MePage {
  userInfo: UserInfo;
  constructor(public navCtrl: NavController, private userInfoService: UserInfoService,
    private deviceInfoService: DeviceInfoService, public itemDataService: ItemDataService, public alertCtrl: AlertController) {
    // this.userInfo = this.userInfoService.userInfo;
    // console.log("dayin");
    // console.log(this.userInfo);
    this.userInfo = this.userInfoService.userInfo;
     console.log("1");
  }
  updateBtnClick() {
    this.itemDataService.updateTestItem();
  }

  clear() {
    this.userInfo = this.userInfoService.userInfo;
    console.log(this.userInfo);
  }

  ionViewDidLoad(){
    console.log("Meview load");
    this.userInfo = this.userInfoService.userInfo;
  }
  changeName() {
    let prompt = this.alertCtrl.create({
      title: '修改用户名',
      message: "在下面的输入框输入用户名",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.userInfo.name = data.title;
            this.userInfoService.updateAndSave();
          }
        }
      ]
    });
    prompt.present();
  }
}
