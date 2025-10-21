import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})
export class ContactDetail implements OnInit {
  contact: Contact;
  private contactService = inject(ContactService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id: string = params['id'];
        this.contact = this.contactService.getContact(id);
      }
    );
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('contacts');
  }
}
