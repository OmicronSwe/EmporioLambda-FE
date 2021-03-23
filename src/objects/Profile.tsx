export interface ProfileJSON {
  sub: string;
  address: string;
  emailVerified: boolean;
  name: string;
  familyName: string;
  email: string;
}

export class Profile implements ProfileJSON {
  sub: string;

  address: string;

  emailVerified: boolean;

  name: string;

  familyName: string;

  email: string;

  constructor(
    sub: string,
    address: string,
    emailVerified: boolean,
    name: string,
    familyName: string,
    email: string
  ) {
    this.sub = sub;
    this.address = address;
    this.emailVerified = emailVerified;
    this.name = name;
    this.familyName = familyName;
    this.email = email;
  }
}