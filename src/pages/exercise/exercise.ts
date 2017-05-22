import { SelectQstPage } from './../select-qst/select-qst';
import { QAndAPage } from './../q-and-a-page/q-and-a-page';
import { SelectCptPage } from './../select-cpt/select-cpt';
import { UserInfoService } from './../../providers/user-info.service';
import { ItemDataService } from './../../providers/item-data.service';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html'
})
export class ExercisePage {
  // loading:Loading;
  everydayWords:string[] = ["书山有路勤为径，\n学海无涯苦作舟。","成功在优点的发挥，\n失败是缺点的累积。","成功是一种观念，\n致富是一种义务，\n快乐是一种权力。","比别人多一点执着，\n你就会创造奇迹。","因为年轻我们一无所有，\n也正因为年轻我们将拥有一切。","鹰击天风壮，\n鹏飞海浪春。","人生没有理想，\n生命便只是一堆空架子。"];
  everydayWord:string;
  day:number;
  constructor(public navCtrl: NavController, public itemDataService: ItemDataService,public userInfoService:UserInfoService) {
    
  }
  changeWord(){
    this.everydayWord = this.everydayWords[(this.day++)%7];
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
    this.navCtrl.push('SelectQstPage',{title:'我的收藏',items:this.userInfoService.getCollect()});
  }
  ionViewDidLoad() {
    // this.loading = this.loadctrl.create({
    //   content:"请稍候..."
    // });
    this.day = new Date().getDay();
    this.everydayWord = this.everydayWords[this.day];
  }
  ionViewWillLeave() {
  }


  // example of adding a transition when pushing a new page
}
