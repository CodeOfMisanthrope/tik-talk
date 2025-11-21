import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {ProfileService} from '../../data/services/profile.service';
import {SubscriberCardComponent} from './subsriber-card/subscriber-card.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgForOf,
    RouterLink,
    SvgIconComponent,
    SubscriberCardComponent,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList()

  // me = this.profileService.getMe();

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
  ];
}
