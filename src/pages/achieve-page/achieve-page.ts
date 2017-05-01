import { UserInfoService,UserInfo } from './../../providers/user-info.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AchievePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-achieve-page',
  templateUrl: 'achieve-page.html',
})
export class AchievePage {

  userInfo:UserInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams,private userInfoService: UserInfoService) {
  }

  ionViewDidLoad() {
    this.userInfo = this.userInfoService.userInfo;
  }

}
