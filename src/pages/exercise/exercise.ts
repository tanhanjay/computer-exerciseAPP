import { ItemDataService } from './../../providers/item-data.service';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html'
})
export class ExercisePage {
  // loading:Loading;
  everydayWords:string[] = ["书山有路勤为径,\n学海无涯苦作舟。"];
  everydayWord:string = "书山有路勤为径,\n 学海无涯苦作舟。";
  constructor(public navCtrl: NavController, public itemDataService: ItemDataService) {
    
  }
  selectcpt() {
    this.navCtrl.push('SelectCptPage');
    // this.appNativeService.pushPage(this.navCtrl,'SelectCptPage');
    
  }

  selectCombExe() {
    // this.loading.present();
   
    this.navCtrl.push('QAndAPage', { startindex: 0, items: this.itemDataService.geneCombTestGroup(3) });    
    // this.loading.dismiss();
    // this.appNativeService.pushPage(this.navCtrl,'QAndAPage', { startindex: 0, items: this.items });
  }
  
  selectCollect(){
    this.navCtrl.push('SelectQstPage',{title:'我的收藏',items:this.itemDataService.getCollect()});
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
