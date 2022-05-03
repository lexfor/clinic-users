export class UpdateDoctorUserCommandUsecase {
  actionID: string;

  firstName: string;

  lastName: string;

  birthday: string;

  address: string;

  gender: string;

  id: string;

  constructor(actionID, firstName, lastName, birthday, address, gender, id) {
    this.actionID = actionID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.id = id;
  }
}
