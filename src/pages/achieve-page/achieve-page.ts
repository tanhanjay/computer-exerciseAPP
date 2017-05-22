import { UserInfoService, UserInfo } from './../../providers/user-info.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

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

  userInfo: UserInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userInfoService: UserInfoService, private socialSharing: SocialSharing, private alertCtrl: AlertController) {
  }
  share() {
    //  this.socialSharing.canShareVia("QQ").then((value)=>{
    //    this.alertCtrl.create({
    //      title:"能分享到QQ"
    //    }).present();
    //  }).catch((value)=>{
    //    this.alertCtrl.create({
    //      title:"不能分享到QQ"
    //    }).present();
    //  })
    //   this.socialSharing.share("哈哈哈哈").then((data)=>{
    //     this.alertCtrl.create({
    //       title:"成功"
    //     }).present();
    //   },(data)=>{
    //     this.alertCtrl.create({
    //       title:"失败"
    //     }).present();
    //   });
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });

    // Share via email
    this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  ionViewDidLoad() {
    this.userInfo = this.userInfoService.userInfo;
  }

}
