import { Routes } from '@angular/router';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: SearchPageComponent},
    ],
    // canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPageComponent},
];
