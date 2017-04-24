import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCptPage } from './select-cpt';

@NgModule({
  declarations: [
    SelectCptPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCptPage),
  ],
  exports: [
    SelectCptPage
  ]
})
export class SelectCptModule {}
