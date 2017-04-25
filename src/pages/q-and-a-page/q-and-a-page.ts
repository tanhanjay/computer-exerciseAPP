import { ItemData } from './../../providers/item-data.service';
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
  result:boolean;
  answers:string[] = ["A","B","C","D"];
  answershow:boolean = false;
  end:boolean = false;
  private length:number; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.index = navParams.data.startindex;
    this.items = navParams.data.items;
    this.length = this.items.length;
    this.loadQAndA();
  }
  
  makechoice(answerIndex:number){
    if(this.item.itemAnswer.trim().toUpperCase() === this.answers[answerIndex])
      this.result = true;
    else
      this.result = false;

    this.qstmode = false;
  } 
  loadQAndA(){
    this.qstmode = true;
    this.item = this.items[this.index];
    this.index++;
    this.end = this.index >=this.length ? true : false;
  }
  
  reloadQAndA(){
    this.index--;
    this.loadQAndA();
  }
  toggleAnswer(){
    this.answershow = !this.answershow;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QAndAPage');
    
  }

}
