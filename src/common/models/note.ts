import { v4 } from 'uuid';

// Note model class
export class Note {
  public id: string;
  public content: string;
  public createdAt: Date;

  constructor(note: string) {
    this.id = v4();
    this.content = note;
    this.createdAt = new Date();
  }
}
