import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';
import { FirebaseService } from '../shared/firebase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../contacts/contact.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firebaseService = inject(FirebaseService);
  private http = inject(HttpClient);

  private messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  private maxMessageId: number;

  constructor() {
    // this.messages = MOCKMESSAGES;

    this.maxMessageId = this.getMaxId();
  }

  getMessages() {
    // this.firebaseService.get<Message[]>('messages').subscribe(
    this.firebaseService.get<{messages: Message[]}>('messages').subscribe(
      // (messages: Message[]) => {
      (res) => {
        this.messages = res.messages;
        // console.log('messages', this.messages);
        // this.maxMessageId = this.getMaxId();
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

    // this.maxMessageId++;
    // message.id = this.maxMessageId.toString();
    message.id = '';
    console.log('addmessage sender', message);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{message: string, createdMessage: Message }>(
      'http://localhost:3000/messages',
      message,
      {headers: headers}
    )
    .subscribe((responseData) => {
      if (responseData.createdMessage.sender == null) {
        // console.log('no sender');
        responseData.createdMessage.sender = new Contact('123', 'Tim Lee', 'a', 'b', 'd', null);
      }
      this.messages.push(responseData.createdMessage);
      // console.log(responseData);
      this.messageChangedEvent.next(this.messages.slice());

    });



    // this.storeMessages();
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
