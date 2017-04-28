import { ItemDataService,ItemData } from './../../providers/item-data.service';
// import { SelectCpt } from './../select-cpt/select-cpt';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html'
})
export class ExercisePage {
  
  items:ItemData[];
  constructor(public navCtrl: NavController,public itemDataService:ItemDataService) {
    
  }
  selectcpt(){
    this.navCtrl.push('SelectCptPage');
  }
  selectCombExe(){
    this.items = this.itemDataService.geneCombTestGroup(3);
        this.navCtrl.push('QAndAPage',{startindex:0,items:this.items});
  }
  ionViewDidLeave(){
    this.itemDataService.saveTestItem();
  }
}
