import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  contactListChangedSub: Subscription;
  term: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();
    this.contactService.getContacts();

    this.contactListChangedSub = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    );
  }

  ngOnDestroy(): void {
    this.contactListChangedSub.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}
