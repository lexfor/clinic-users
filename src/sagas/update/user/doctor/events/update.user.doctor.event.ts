export class UpdateUserDoctorEvent {
  actionID: string;

  firstName: string;

  lastName: string;

  birthday: string;

  address: string;

  gender: string;

  userID: string;

  constructor(
    actionID,
    firstName,
    lastName,
    birthday,
    address,
    gender,
    userID,
    ) {
    this.actionID = actionID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.address = address;
    this.gender = gender;
    this.userID = userID;
  }
}