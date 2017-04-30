import { UserInfo } from './../../providers/user-info.service';
import { ItemDataService } from './../../providers/item-data.service';
import { DeviceInfoService } from './../../providers/device-info.service';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserInfoService } from "../../providers/user-info.service";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-contact',
  templateUrl: 'me.html'
})
export class MePage {
  userInfo: UserInfo;
  imgURI: string;
  constructor(public navCtrl: NavController, private userInfoService: UserInfoService,
  public itemDataService: ItemDataService,
    public alertCtrl: AlertController, private imagePicker: ImagePicker) {
    // this.userInfo = this.userInfoService.userInfo;
    // console.log("dayin");
    // console.log(this.userInfo);
    this.userInfo = this.userInfoService.userInfo;
    this.imgURI = "assets/img/choice1.jpg";
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
            this.userInfoService.saveUserInfo();
          }
        }
      ]
    });
    prompt.present();
  }
  //调用图库
  pickPic() {

    this.imagePicker.hasReadPermission().then(result => {
      if (!result) {
        this.imagePicker.requestReadPermission().then(() => {
          this.calpic();
        });
      } else {
        this.calpic();
      }

    });
  }
  calpic() {
    let option: ImagePickerOptions = {
      maximumImagesCount: 1,
      height: 100,
      width: 100
    };
    this.imagePicker.getPictures(option).then((results) => {
      if (results[0]) {
        this.userInfo.picURI = "" + results[0];
        this.userInfoService.saveUserInfo();
      }
    }, (err) => { this.showAlert(err) });
  }
  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: '信息',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  changeMoto() {
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
            this.userInfoService.saveUserInfo();
          }
        }
      ]
    });
    prompt.present();
  }
  showAchieve() {
    this.navCtrl.push('AchievePage');
  }
}
