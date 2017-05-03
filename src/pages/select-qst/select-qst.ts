import { ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemDataService: ItemDataService, public alertCtrl: AlertController,private toastCtrl:ToastController) {

  }

  selectQstClick(index: number) {
    this.navCtrl.push('QAndAPage', { startindex: index, items: this.items });
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
            this.itemDataService.deleteCollectItemById(itemID);
            this.items = this.itemDataService.getCollect();
            this.presentToast("试题已删除");
          }
        }
      ]
    }).present();
  }
  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  ionViewDidLoad() {
    this.items = this.navParams.data.items;
    this.title = this.navParams.data.title;
    this.collectMode = this.title === "我的收藏" ? true : false;
    this.resultColors = this.itemDataService.resultSet;
  }
  ionViewDidLeave(){
    this.itemDataService.saveCollectItems();
  }

}
