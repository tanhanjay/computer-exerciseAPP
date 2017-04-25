import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QAndAPage } from './q-and-a-page';

@NgModule({
  declarations: [
    QAndAPage,
  ],
  imports: [
    IonicPageModule.forChild(QAndAPage),
  ],
  exports: [
    QAndAPage
  ]
})
export class QAndAPageModule {}
