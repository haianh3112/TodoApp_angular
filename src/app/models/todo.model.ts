export class Todo {
  public id!: number;
  public title: string;
  public compelete: boolean;

  constructor(title: string) {
    this.title = title;
    this.compelete = false;
  }

}
