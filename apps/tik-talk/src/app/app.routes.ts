import { Routes } from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { chatsRoutes } from '@tt/chats';
import { experimentalRoutes } from '@tt/experimental';
import { LayoutComponent } from '@tt/layout';
import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent
} from '@tt/profile';
import {PostsEffects, postsFeature} from '@tt/posts';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [
          provideState(postsFeature),
          provideEffects(PostsEffects)
        ]
      },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      { path: 'chats', loadChildren: () => chatsRoutes },
      { path: 'experimental', loadChildren: () => experimentalRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
