import { Route } from '@angular/router';
import { ExperimentalPageComponent } from './experimental-page.component';
import { ExperimentalFromTvComponent } from '../../feature-form-tv';
import { ExperimentalFormAnimeReviewComponent } from '../../feature-form-anime-review';

export const experimentalRoutes: Route[] = [
  {
    path: '',
    component: ExperimentalPageComponent,
    children: [
      {
        path: 'tv',
        component: ExperimentalFromTvComponent,
      },
      {
        path: 'anime-review',
        component: ExperimentalFormAnimeReviewComponent,
      },
    ],
  },
];
