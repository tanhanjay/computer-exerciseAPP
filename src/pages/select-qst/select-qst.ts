import { CPT, ItemDataService,ItemData } from './../../providers/item-data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  cpt:CPT;
  items:ItemData[];
  fillBlank:number[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public itemDataService:ItemDataService) {
    this.cpt = navParams.data;
    this.items = itemDataService.getItemDataByCpt(this.cpt.cptNum);
    let l =this.items.length%5;
    if(l){
      this.fillBlank = [];
      for(let i=0;i<5-l;i++){
        this.fillBlank.push(i);
      }
    }
  }
  
  selectQstClick(item:ItemData){
    this.navCtrl.push('QuestionPage',item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectQst');
  }

}
