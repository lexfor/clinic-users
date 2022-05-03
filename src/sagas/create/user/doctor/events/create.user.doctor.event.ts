export class CreateUserDoctorEvent {
  actionID: string;

  firstName: string;

  lastName: string;

  birthday: string;

  address: string;

  gender: string;

  cabinet: string;

  position: string;

  specializationID: string;

  credentialID: string;

  constructor(
    actionID,
    firstName,
    lastName,
    birthday,
    address,
    gender,
    cabinet,
    position,
    specializationID,
    credentialID,
    ) {
    this.actionID = actionID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.address = address;
    this.gender = gender;
    this.cabinet = cabinet;
    this.position = position;
    this.specializationID = specializationID;
    this.credentialID = credentialID;
  }
}