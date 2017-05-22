import { QAndAPage } from './../q-and-a-page/q-and-a-page';
import { ToastController } from 'ionic-angular';
import { UserInfoService } from './../../providers/user-info.service';
import { ItemDataService, ItemData } from './../../providers/item-data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SelectQst page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-qst',
  templateUrl: 'select-qst.html',
})
export class SelectQstPage {
  items: ItemData[];
  title: string;
  resultColors: {};
  collectMode: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemDataService: ItemDataService, public alertCtrl: AlertController,private userInfoService:UserInfoService,private toastCtrl:ToastController) {

  }

  selectQstClick(index: number) {
    this.navCtrl.push(QAndAPage, { startindex: index, items: this.items });
    // this.appNativeService.pushPage(this.navCtrl,'QAndAPage',{startindex:index,items:this.items});
  }

  deleteFromCollect(itemID: string) {
    if(!this.collectMode) return;
    this.alertCtrl.create({
      title: '注意',
      message: '您确定要删除收藏中的试题吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            let msg = this.userInfoService.deleteCollectItemById(itemID);
            this.items = this.userInfoService.getCollect();
            this.toastCtrl.create({
                message: msg,
                duration: 2000
            }).present();
          }
        }
      ]
    }).present();
  }
  ionViewDidLoad() {
    this.items = this.navParams.data.items;
    this.title = this.navParams.data.title;
    this.collectMode = this.title === "我的收藏" ? true : false;
    this.resultColors = this.userInfoService.userExeciseInfo.resultSet;
  }
  ionViewDidLeave(){
    this.userInfoService.saveUserExerciseInfo();
  }

}
