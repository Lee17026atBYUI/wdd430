import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {
  messages: Message[] = [
    new Message(9, 'You Win!', 'You won a trip to space!', 'John NASA'),
    new Message(10, 'Important Update', 'The moon is gone :(', 'Fred Bread'),
    new Message(11, 'RE: RE: RE: Chain link fence', 'Reply to this email to order fences.', 'Bob Fence')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
