import { QAndAPage } from './../q-and-a-page/q-and-a-page';
import { UserInfoService } from './../../providers/user-info.service';
import { ItemDataService, CPT,ItemData } from './../../providers/item-data.service';
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
  
  selectedCptnum:number = 0;
  cpts:CPT[];
  items:ItemData[];
  resultColors: {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public itemDataService:ItemDataService,private userInfoService:UserInfoService) {
    
}

  ionViewDidLoad() {
    this.cpts = this.cpts? this.cpts:this.itemDataService.getCpts();
    this.resultColors = this.userInfoService.userExeciseInfo.resultSet;
  }

  selectQstClick(index:number){
    this.navCtrl.push(QAndAPage, { startindex: index, items: this.items });
  }
  itemSelected(cpt:CPT){
      // this.navCtrl.push('SelectQstPage',{items:this.itemDataService.getItemDataByCpt(cpt.cptNum),title:cpt.title});
      // this.appNativeService.pushPage(this.navCtrl,'SelectQstPage',cpt);
      this.selectedCptnum = cpt.cptNum === this.selectedCptnum?0:cpt.cptNum; 
      this.items = this.itemDataService.getItemDataByCpt(this.selectedCptnum);
  }

}
