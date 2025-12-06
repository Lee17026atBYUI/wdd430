export class Speaker {
  constructor(
    public _id: string,
    public name: string,
    public lastSpoke?: Date
  ) {}
}
