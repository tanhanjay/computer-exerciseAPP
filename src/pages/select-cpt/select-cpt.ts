import { ItemDataService } from './../../providers/item-data.service';
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
export class SelectCpt {
  
  
  cpts:number[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public itemDataService:ItemDataService) {
    this.procpts(itemDataService.getCptLength());
    
}
  procpts(cptLength:number){
    this.cpts =[];
    for(let i=0;i<cptLength;i++){
      this.cpts.push(i+1);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCpt');
  }

  itemSelected(cpt){
      
  }

}
