import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { FirebaseService } from '../shared/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private firebaseService = inject(FirebaseService);
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;

    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.firebaseService.get<Contact[]>('contacts').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  storeContacts() {
    this.firebaseService.put('contacts', this.contacts);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach((contact) => {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact == null) { // this checks for both null and undefined
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == null || newContact == null) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }
}
