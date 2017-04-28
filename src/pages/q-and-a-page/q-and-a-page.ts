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
  qstmode:boolean;//true:question 问题模式；false:answer 答案模式
  index:number;
  items:ItemData[];
  item:ItemData;
  // result:boolean;
  answers:string[] = ["A","B","C","D"];
  answershow:boolean = false;
  end:boolean = false;
  start:boolean = false;
  private length:number; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public userInfoService:UserInfoService,public itemDataService:ItemDataService) {
    this.index = navParams.data.startindex;
    this.items = navParams.data.items;
    this.length = this.items.length;
    this.loadQAndA();
  }
  
  makechoice(answerIndex:number){
    if(this.item.itemAnswer.trim().toUpperCase() === this.answers[answerIndex]){
      // this.result = true;
      this.item.result = "secondary";
      this.userInfoService.addRight();
    }
    else{
      // this.result = false;
      this.item.result = "danger";
      this.userInfoService.addWrong();      
    }

    this.qstmode = false;
  } 
  loadQAndA(){
    this.qstmode = true;
    this.item = this.items[this.index];
    if(!this.index){
      this.start = true;
    }else{
      this.start = false;
    }
    this.index++;
    this.end = this.index >=this.length ? true : false;
  }
  
  reloadQAndA(){
    this.index--;
    this.loadQAndA();
  }

  PreviousQAndA(){
    this.index-=2;
    this.loadQAndA();
  }
  toggleAnswer(){
    this.answershow = !this.answershow;
  }
  finishClick(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QAndAPage');
    
  }
  ionViewDidLeave(){
    this.userInfoService.updateAndSave();
    this.itemDataService.saveTestItem();
  }

}
