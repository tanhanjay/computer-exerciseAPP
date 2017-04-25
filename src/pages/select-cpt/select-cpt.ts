import { ItemDataService, CPT } from './../../providers/item-data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectCpt page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-cpt',
  templateUrl: 'select-cpt.html',
})
export class SelectCptPage {
  
  
  cpts:CPT[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public itemDataService:ItemDataService) {
    this.cpts = this.itemDataService.getCpts();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCpt');
  }

  itemSelected(cpt:CPT){
      this.navCtrl.push('SelectQstPage',cpt);
  }

}
