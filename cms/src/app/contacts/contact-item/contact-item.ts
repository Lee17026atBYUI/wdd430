import { Component, Input } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css'
})
export class ContactItem {
  // this @Input() decorator means the parent component can bind this property
  @Input() contact: Contact;
  @Input() isGroupContact = false;
}
