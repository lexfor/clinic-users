export class CreatePatientUserCommandUsecase {
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
    this.gender = gender;
    this.address = address;
    this.credentialID = credentialID;
  }
}
