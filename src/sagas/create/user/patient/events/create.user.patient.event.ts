export class CreateUserPatientEvent {
  actionID: string;

  firstName: string;

  lastName: string;

  birthday: string;

  address: string;

  gender: string;

  credentialID: string;

  constructor(actionID, firstName, lastName, birthday, address, gender, credentialID) {
    this.actionID = actionID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.address = address;
    this.gender = gender;
    this.credentialID = credentialID;
  }
}