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

  constructor(public navCtrl: NavController, public navParams: NavParams,public itemDataService:ItemDataService) {
    this.cpt = navParams.data;
    this.items = itemDataService.getItemDataByCpt(this.cpt.cptNum);
  }
  
  selectQstClick(index:number){
    this.navCtrl.push('QAndAPage',{startindex:index,items:this.items});
  }

  ionViewDidLoad() {
  }

}
