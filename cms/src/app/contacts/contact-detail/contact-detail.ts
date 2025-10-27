import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})
export class ContactDetail implements OnInit, OnDestroy {
  contact: Contact;
  private subscription: Subscription;
  private id: string;
  private contactService = inject(ContactService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );

    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contact = this.contactService.getContact(this.id);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('contacts');
  }
}
