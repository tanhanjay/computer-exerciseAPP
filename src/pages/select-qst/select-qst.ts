import { APPNativeService } from './../../providers/app-native.service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public itemDataService:ItemDataService,public appNativeService: APPNativeService) {
    this.cpt = navParams.data;
    
  }
  
  selectQstClick(index:number){
    // this.navCtrl.push('QAndAPage',{startindex:index,items:this.items});
    this.appNativeService.pushPage(this.navCtrl,'QAndAPage',{startindex:index,items:this.items});
  }

  ionViewDidLoad() {
    this.items = this.itemDataService.getItemDataByCpt(this.cpt.cptNum);
  }

}
