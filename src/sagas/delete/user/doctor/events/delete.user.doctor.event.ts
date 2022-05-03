export class DeleteUserDoctorEvent {
  actionID: string;

  userID: string;

  constructor(
    actionID,
    userID,
    ) {
    this.actionID = actionID;
    this.userID = userID;
  }
}