import { Contact } from "../contacts/contact.model";

export class Message {
  constructor(
    public id: string,
    public subject: string,
    public msgText: string,
    // public sender: string,
    public sender: any,
    // public sender: Contact,
    // public sender: Contact | string,
    // public _id: string = ''
    // sender might be a Contact?
  ) {}
}