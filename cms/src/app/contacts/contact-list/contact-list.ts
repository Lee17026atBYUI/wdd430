import { Component, EventEmitter, Output } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList {
  contacts: Contact[] = [
    new Contact(1, 'R. Kent Jackson', 'jacksonk@byui.edu', '208-123-2356', 'assets/images/jacksonk.jpg', null),
    new Contact(2, 'Rex Barzee', 'barzeer@byui.edu', '208-356-4353', 'assets/images/barzeer.jpg', null)
  ];

  // these emitters let us send data to the parent component
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  // the parent component html must listen for this event
  
  // we also need a method to then fire this emitter
  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
