import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import {ImgUrlPipe, MessageCountComponent, SvgIconComponent} from '@tt/common-ui';
import {ChatsService} from '@tt/chats';
import {ProfileService} from '@tt/profile';
import { firstValueFrom } from 'rxjs';
import { SubscriberCardComponent } from './subsriber-card/subscriber-card.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgForOf,
    RouterLink,
    SvgIconComponent,
    MessageCountComponent,
    SubscriberCardComponent,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  chatService = inject(ChatsService);
  subscribers$ = this.profileService.getSubscribersShortList();

  unreadMessageCount = this.chatService.unreadMessagesCount;
  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
