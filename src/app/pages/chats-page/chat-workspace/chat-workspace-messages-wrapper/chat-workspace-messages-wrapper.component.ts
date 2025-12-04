import {Component, inject, input, OnInit, signal} from '@angular/core';
import {ChatWorkspaceMessageComponent} from './chat-workspace-message/chat-workspace-message.component';
import {MessageInputComponent} from '../../../../common-ui/message-input/message-input.component';
import {ChatsService} from '../../../../data/services/chats.service';
import {Chat, Message} from '../../../../data/interfaces/chats.interface';
import {firstValueFrom, interval, timer} from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [
    ChatWorkspaceMessageComponent,
    MessageInputComponent
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent implements OnInit {
  chatsService = inject(ChatsService);

  chat = input.required<Chat>();

  messages = this.chatsService.activeChatMessages;

  ngOnInit() {
    interval(10000).subscribe(() => {
      console.log('updated messages')
      this.chatsService.getChatById(this.chat().id);
      console.log(this.messages());
    });
  }

  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText));

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }
}
