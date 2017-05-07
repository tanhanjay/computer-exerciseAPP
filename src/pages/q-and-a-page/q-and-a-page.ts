import { ToastController } from 'ionic-angular';
import { UserInfoService } from './../../providers/user-info.service';
import { ItemData, ItemDataService } from './../../providers/item-data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QAndAPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-q-and-a-page',
  templateUrl: 'q-and-a-page.html',
})
export class QAndAPage {
  qstmode: boolean;//true:question 问题模式；false:answer 答案模式
  index: number;
  items: ItemData[];
  item: ItemData;
  // result:boolean;
  answers: string[] = ["A", "B", "C", "D"];
  answershow: boolean = false;
  end: boolean = false;
  start: boolean = false;
  private length: number;
  resultColors: {};
  choiceBtnColor: string;
  isCollected: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userInfoService: UserInfoService, public itemDataService: ItemDataService, public toastCtrl: ToastController) {
    this.resultColors = {};
  }

  makechoice(answerIndex: number) {
    if (this.item.itemAnswer.trim().toUpperCase() === this.answers[answerIndex]) {
      // this.result = true;
      this.userInfoService.setResultById(this.item.itemID, 'secondary');
      this.userInfoService.addRight();
    }
    else {
      // this.result = false;
      this.userInfoService.setResultById(this.item.itemID, 'danger');
      this.userInfoService.addWrong();
    }

    this.qstmode = false;
    this.choiceBtnColor = 'light';
  }
  swipeToChangeItem(e) {
    if (e.direction == 2 && !this.end) {
      //direction 2 = right to left swipe.
      this.loadQAndA();
    }
    if (e.direction == 4) {
      //direction 2 = left to right swipe
      if (this.qstmode && !this.start) {
        this.PreviousQAndA();
      } else {
        this.reloadQAndA();
      }
    }
  }
  loadQAndA() {
    this.qstmode = true;
    this.choiceBtnColor = 'primary';
    this.item = this.items[this.index];
    this.isCollected = this.userInfoService.isInCollect(this.item.itemID);
    if (!this.index) {
      this.start = true;
    } else {
      this.start = false;
    }
    this.index++;
    this.end = this.index >= this.length ? true : false;
  }

  reloadQAndA() {
    this.index--;
    this.loadQAndA();
  }

  PreviousQAndA() {
    this.index -= 2;
    this.loadQAndA();
  }
  toggleAnswer() {
    this.answershow = !this.answershow;
  }
  finishClick() {
    this.navCtrl.pop();
  }
  toggleCollect() {
    if (this.isCollected) {
      this.rmFromCollect(this.item.itemID);
      this.isCollected = false;
    } else {
      this.addToCollect(this.item);
      this.isCollected = true;
    }
  }
  addToCollect(item: ItemData) {
    let msg = this.userInfoService.addToCollect(item);
    this.isCollected = this.userInfoService.isInCollect(this.item.itemID);
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).present();
  }
  rmFromCollect(itemId: string) {
    let msg = this.userInfoService.deleteCollectItemById(itemId);
    this.isCollected = this.userInfoService.isInCollect(this.item.itemID);
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).present();
  }
  ionViewDidLoad() {
    this.resultColors = this.userInfoService.userExeciseInfo.resultSet;
    this.index = this.navParams.data.startindex;
    this.items = this.navParams.data.items;
    this.length = this.items.length;
    this.loadQAndA();
  }
  ionViewDidLeave() {
    this.userInfoService.updateAndSave();
    this.itemDataService.saveTestItem();
    this.userInfoService.saveUserExerciseInfo();
  }

}
