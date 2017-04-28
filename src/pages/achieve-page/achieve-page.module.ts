import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievePage } from './achieve-page';

@NgModule({
  declarations: [
    AchievePage,
  ],
  imports: [
    IonicPageModule.forChild(AchievePage),
  ],
  exports: [
    AchievePage
  ]
})
export class AchievePageModule {}
