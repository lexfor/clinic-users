import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { UpdateUserDoctorEvent } from './events';
import { UpdateDoctorUserCommandUsecase } from '../../../../domain/user/usecases/commands';

export class UpdateUserDoctorSaga {
  @Saga()
  execute(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(UpdateUserDoctorEvent),
      map((event: UpdateUserDoctorEvent) => new UpdateDoctorUserCommandUsecase(
        event.actionID,
        event.firstName,
        event.lastName,
        event.birthday,
        event.address,
        event.gender,
        event.userID)),
    );
  }
}