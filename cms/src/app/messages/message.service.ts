import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { FirebaseService } from '../shared/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firebaseService = inject(FirebaseService);

  private messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  private maxMessageId: number;

  constructor() {
    this.messages = MOCKMESSAGES;

    this.maxMessageId = this.getMaxId();
  }

  getMessages() {
    this.firebaseService.get<Message[]>('messages').subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
    // return this.messages.slice();
  }

  storeMessages() {
    this.firebaseService.put('messages', this.messages);
    this.messageChangedEvent.next(this.messages.slice());
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
    this.storeMessages();
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
