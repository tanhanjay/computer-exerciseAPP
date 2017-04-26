import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectCombExe page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-comb-exe',
  templateUrl: 'select-comb-exe.html',
})
export class SelectCombExe {
  
  mydate:Date;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mydate = new Date();
  }

  ionViewDidLoad() {
  }

}
