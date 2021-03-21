export interface CategoryJSON {
  name: string;
}

export class Category implements CategoryJSON {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
