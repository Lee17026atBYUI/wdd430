import { Component } from '@angular/core';

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
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }
}
