import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  // value is piped in input
  // spread args is all the other arguments that we pass in with colon :
  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = [];

    if (!term) {
      return contacts;
    }

    if (term && term.length > 0) {
      filteredContacts = contacts.filter((contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase()));
      // no need for return in that arrow function because we omit {}
    }

    return filteredContacts;
  }

}
