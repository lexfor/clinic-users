import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { DeleteUserDoctorEvent } from './events';
import {
  DeleteDoctorUserCommandUsecase
} from '../../../../domain/user/usecases/commands';

export class DeleteUserDoctorSaga {
  @Saga()
  execute(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(DeleteUserDoctorEvent),
      map((event: DeleteUserDoctorEvent) => new DeleteDoctorUserCommandUsecase(
        event.actionID,
        event.userID)),
    );
  }
}