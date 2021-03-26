export interface ProfileJSON {
  sub: string;
  address: string;
  name: string;
  family_name: string;
  email: string;
}

export class Profile implements ProfileJSON {
  sub: string;

  address: string;

  name: string;

  family_name: string;

  email: string;

  constructor(
    sub: string,
    address: string,
    name: string,
    family_name: string,
    email: string
  ) {
    this.sub = sub;
    this.address = address;
    this.name = name;
    this.family_name = family_name;
    this.email = email;
  }
}