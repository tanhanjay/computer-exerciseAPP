import { AchievePage } from './../achieve-page/achieve-page';
import { UserInfo } from './../../providers/user-info.service';
import { ItemDataService } from './../../providers/item-data.service';
import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { UserInfoService } from "../../providers/user-info.service";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
@Component({
  selector: 'page-contact',
  templateUrl: 'me.html'
})
export class MePage {
  userInfo: UserInfo;
  islogin : boolean;
  constructor(public navCtrl: NavController, public userInfoService: UserInfoService,
    public itemDataService: ItemDataService, 
    public alertCtrl: AlertController, private imagePicker: ImagePicker,
    private platform: Platform) {

  }
  updateBtnClick() {
    this.itemDataService.updateTestItem();
  }

  clear() {
    this.userInfoService.clearS();
    this.platform.exitApp();
  }

  checkIn() {
    if (this.userInfo.today.rightItemCount < 10) {
      this.showAlert("请至少做对10道练习题！")
      return;
    }
    this.userInfoService.checkIn();
  }

  ionViewDidLoad() {
    this.userInfo = this.userInfoService.userInfo;
    this.islogin = this.userInfoService.isLogin;
  }

  logIn(username:string,password:string){
    let msg =this.userInfoService.logIn(username,password,()=>{this.userInfo = this.userInfoService.userInfo;});
      this.showAlert(msg);
  }
  signIn(username:string,password:string){
    let msg =this.userInfoService.signIn(username,password,()=>{this.userInfo = this.userInfoService.userInfo;});
      this.showAlert(msg);
  }
  // changeName() {
  //   let prompt = this.alertCtrl.create({
  //     title: '修改用户名',
  //     message: "在下面的输入框输入用户名",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: '用户名',
  //         value: this.userInfo.username
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: '取消',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: '保存',
  //         handler: data => {
  //           this.userInfo.username = data.title;
  //           this.userInfoService.saveUserInfo();
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
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
      height: 200,
      width: 200
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
  logOut(){
    this.userInfoService.logOut(()=>{this.userInfo = this.userInfoService.userInfo});
  }
  changeMoto() {
    let prompt = this.alertCtrl.create({
      title: '修改座右铭',
      message: "在下面的输入框输入座右铭",
      inputs: [
        {
          name: 'title',
          placeholder: '座右铭',
          value: this.userInfo.moto
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
    this.navCtrl.push(AchievePage);
    // this.appNativeService.pushPage(this.navCtrl, 'AchievePage');
  }
 
}

  
