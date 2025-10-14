import { Component, EventEmitter, Output } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  // these emitters let us send data to the parent component
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  // the parent component html must listen for this event
  
  // we also need a method to then fire this emitter
  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
