import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[];
  messageChangedEvent = new Subject<Message[]>();
  private maxMessageId: number;

  constructor() {
    this.messages = MOCKMESSAGES;

    this.maxMessageId = this.getMaxId();
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    if (message == null) {
      return;
    }

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.forEach((message: Message) => {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }
}
