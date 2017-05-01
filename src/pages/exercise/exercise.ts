import { ItemDataService, ItemData } from './../../providers/item-data.service';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html'
})
export class ExercisePage {
  items: ItemData[];
  // loading:Loading;
  constructor(public navCtrl: NavController, public itemDataService: ItemDataService) {
    
  }
  selectcpt() {
    this.navCtrl.push('SelectCptPage');
    // this.appNativeService.pushPage(this.navCtrl,'SelectCptPage');
    
  }

  selectCombExe() {
    // this.loading.present();
    this.items = this.itemDataService.geneCombTestGroup(3);    
    this.navCtrl.push('QAndAPage', { startindex: 0, items: this.items });    
    // this.loading.dismiss();
    // this.appNativeService.pushPage(this.navCtrl,'QAndAPage', { startindex: 0, items: this.items });
  }

  ionViewDidLoad() {
    // this.loading = this.loadctrl.create({
    //   content:"请稍候..."
    // });
  }
  ionViewWillLeave() {
  }


  // example of adding a transition when pushing a new page
}
