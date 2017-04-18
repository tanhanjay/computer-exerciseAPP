import { Component } from '@angular/core';

import { NewsPage } from '../news/news';
import { AchievePage } from '../achieve/achieve';
import { ExercisePage } from '../exercise/exercise';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ExercisePage;
  tab2Root = NewsPage;
  tab3Root = AchievePage;

  constructor() {

  }
}
