// import { SelectCpt } from './../select-cpt/select-cpt';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html'
})
export class ExercisePage {

  constructor(public navCtrl: NavController) {
    
  }
  selectcpt(){
    this.navCtrl.push('SelectCpt');
  }
}
