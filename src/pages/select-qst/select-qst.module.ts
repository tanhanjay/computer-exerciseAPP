import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectQstPage } from './select-qst';

@NgModule({
  declarations: [
    SelectQstPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectQstPage),
  ],
  exports: [
    SelectQstPage
  ]
})
export class SelectQstModule {}
