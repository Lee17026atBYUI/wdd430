import { Component } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})
export class ContactDetail {
  contact: Contact;
  // contact = new Contact(1, 'K. Jackson II', 'jacksonkii@byui.edu', '208-123-2356', 'assets/images/jacksonk.jpg', null);

}
