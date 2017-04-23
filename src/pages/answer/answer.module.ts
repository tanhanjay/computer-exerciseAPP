import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Answer } from './answer';

@NgModule({
  declarations: [
    Answer,
  ],
  imports: [
    IonicPageModule.forChild(Answer),
  ],
  exports: [
    Answer
  ]
})
export class AnswerModule {}
