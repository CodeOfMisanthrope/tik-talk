import { Routes } from '@angular/router';
import { LayoutComponent } from '../../../../libs/common-ui/src/lib/components/layout/layout.component';
import { LoginPageComponent } from '../../../../libs/auth/src/lib/feature-login/login-page/login-page.component';
import {canActivateAuth} from "@tt/auth";
import {chatsRoutes} from '@tt/chats';
import {ProfilePageComponent, SearchPageComponent} from '@tt/profile';
import { SettingsPageComponent } from '../../../../libs/profile/src/lib/feature-profile-settings/settings-page/settings-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
