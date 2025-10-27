import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DndDropEvent } from 'ngx-drag-drop';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css'
})
export class ContactEdit implements OnInit, OnDestroy {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  invalidGroupContactAdd = false;
  private subscription: Subscription;

  private contactService = inject(ContactService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if (this.id == null) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.id);

        if (this.originalContact == null) return;

        this.editMode = true;
        this.contact = this.cloneObject(this.originalContact);

        if (this.contact.group) {
          this.groupContacts = this.cloneObject(this.contact.group);
        }
      }
    );

    this.subscription = this.contactService.contactListChangedEvent.subscribe((contact: Contact[]) => {
      if (this.id == null) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (this.originalContact == null) return;
      this.editMode = true;
      this.contact = this.cloneObject(this.originalContact);
      if (this.contact?.group) {
        this.groupContacts = this.cloneObject(this.contact.group);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      null, 
      value.name, 
      value.email, 
      value.phone, 
      value.imageUrl, 
      this.groupContacts
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.onCancel();
  }

  onDrop(event: DndDropEvent) {
    this.addToGroup(event.data);
  }

  addToGroup(newContact: Contact) {
    const invalidGroupContact = this.isInvalidContact(newContact);
    if (invalidGroupContact) {
      return;
    }

    this.groupContacts.push(newContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(index, 1);
  }

  isInvalidContact(newContact: Contact) {
    this.invalidGroupContactAdd = false;
    if (!newContact) {
      // nothing here!
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      // this is the same contact!
      this.invalidGroupContactAdd = true;
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        // this contact already has the new contact in their group
        this.invalidGroupContactAdd = true;
        return true;
      }
    }

    // I guess it really is valid
    return false;
  }

}
