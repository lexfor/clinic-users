export class UpdateDoctorCommandUsecase {
  id: string;

  firstName: string;

  lastName: string;

  gender: string;

  address: string;

  birthday: string;

  cabinet: string;

  position: string;

  specializationID: string;

  constructor(
    id,
    firstName,
    lastName,
    gender,
    address,
    birthday,
    cabinet,
    position,
    specializationID,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.address = address;
    this.birthday = birthday;
    this.cabinet = cabinet;
    this.position = position;
    this.specializationID = specializationID;
  }
}
