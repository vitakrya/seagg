export default class Person {
  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getFullName() {
    return [this.firstName, this.lastName].join(' ');
  }

  isAdmin() {
    return true;
  }
}