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
    console.log(this.userInfo);
  }
  updateBtnClick() {
    this.itemDataService.updateTestItem();
  }

  clear() {
    this.userInfoService.clearS();
  }

  checkIn() {
    this.userInfoService.checkIn();
  }
  ionViewDidLoad() {
    console.log(this.userInfo);
    this.userInfo = this.userInfoService.userInfo;
  }
  changeName() {
    let prompt = this.alertCtrl.create({
      title: '修改用户名',
      message: "在下面的输入框输入用户名",
      inputs: [
        {
          name: 'title',
          placeholder: '姓名'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '保存',
          handler: data => {
            this.userInfo.name = data.title;
            this.userInfoService.updateAndSave();
          }
        }
      ]
    });
    prompt.present();
  }

  changeMoto(){
    let prompt = this.alertCtrl.create({
      title: '修改座右铭',
      message: "在下面的输入框输入座右铭",
      inputs: [
        {
          name: 'title',
          placeholder: '座右铭'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '保存',
          handler: data => {
            this.userInfo.moto = data.title;
            this.userInfoService.updateAndSave();
          }
        }
      ]
    });
    prompt.present();
  }
  showAchieve(){
    this.navCtrl.push('AchievePage');
  }
}
