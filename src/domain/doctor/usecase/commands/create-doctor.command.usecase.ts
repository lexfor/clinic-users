export class CreateDoctorCommandUsecase {
  actionID: string;

  cabinet: string;

  position: string;

  specializationID: string;

  userID: string;

  constructor(
    actionID,
    cabinet,
    position,
    specializationID,
    userID,
  ) {
    this.actionID = actionID;
    this.cabinet = cabinet;
    this.position = position;
    this.specializationID = specializationID;
    this.userID = userID;
  }
}
