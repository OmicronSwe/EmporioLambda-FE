export interface ProfileJSON {
  username: string;
  address: string;
  name: string;
  family_name: string;
  email: string;
}

export class Profile implements ProfileJSON {
  username: string;

  address: string;

  name: string;

  family_name: string;

  email: string;

  constructor(username: string, address: string, name: string, family_name: string, email: string) {
    this.username = username;
    this.address = address;
    this.name = name;
    this.family_name = family_name;
    this.email = email;
  }
}
