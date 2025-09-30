export class Message {
  constructor(
    public id: number,
    public subject: string,
    public msgText: string,
    public sender: string,
    // sender might be a Contact?
  ) {}
}