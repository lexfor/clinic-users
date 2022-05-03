export class DeleteDoctorUserCommandUsecase {
  actionID: string;

  id: string;

  constructor(actionID, id) {
    this.actionID = actionID;
    this.id = id;
  }
}
