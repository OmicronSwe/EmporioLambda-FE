export default class Profile {
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
