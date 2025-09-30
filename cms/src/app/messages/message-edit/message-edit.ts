import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})
export class MessageEdit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Tim Lee';
  currentId = 1;

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const message = new Message(this.currentId++, subject, msgText, this.currentSender);

    this.addMessageEvent.emit(message);

  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';

  }

}
