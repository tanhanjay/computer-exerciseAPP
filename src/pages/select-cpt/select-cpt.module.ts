import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCpt } from './select-cpt';

@NgModule({
  declarations: [
    SelectCpt,
  ],
  imports: [
    IonicPageModule.forChild(SelectCpt),
  ],
  exports: [
    SelectCpt
  ]
})
export class SelectCptModule {}
