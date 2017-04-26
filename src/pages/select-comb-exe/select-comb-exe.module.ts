import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCombExe } from './select-comb-exe';

@NgModule({
  declarations: [
    SelectCombExe,
  ],
  imports: [
    IonicPageModule.forChild(SelectCombExe),
  ],
  exports: [
    SelectCombExe
  ]
})
export class SelectCombExeModule {}
