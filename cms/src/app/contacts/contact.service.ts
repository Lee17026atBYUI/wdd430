import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';
import { FirebaseService } from '../shared/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private firebaseService = inject(FirebaseService);
  private http = inject(HttpClient);
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId: number;

  constructor() {
    // this.contacts = MOCKCONTACTS;

    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    // this.firebaseService.get<Contact[]>('contacts').subscribe(
    this.firebaseService.get<{contacts: Contact[]}>('contacts').subscribe(
      (res) => {
        this.contacts = res.contacts;
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

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
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

    newContact.id = '';
    console.log('contact service addContact', newContact);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts', 
        newContact, 
        {headers: headers})
      .subscribe((responseData) => {
        console.log('add contact res', responseData);
        this.contacts.push(responseData.contact);

        this.contactListChangedEvent.next(this.contacts.slice());
      });
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
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log('updateContact', newContact);

    // update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
}
