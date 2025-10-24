import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css'
})
export class ContactEdit implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

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
        this.contact = {...this.originalContact};

        if (this.contact.group) {
          this.groupContacts = [...this.contact.group];
        }
      }
    );
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
      value.group);

      if (this.editMode) {
        this.contactService.updateContact(this.originalContact, newContact);
      } else {
        this.contactService.addContact(newContact);
      }

      this.onCancel();
  }

}
