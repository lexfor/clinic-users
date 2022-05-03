import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreateUserDoctorEvent } from './events';
import { CreateDoctorUserCommandUsecase } from '../../../../domain/user/usecases/commands';

export class CreateUserDoctorSaga {
  @Saga()
  execute(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(CreateUserDoctorEvent),
      map((event: CreateUserDoctorEvent) => new CreateDoctorUserCommandUsecase(
        event.actionID,
        event.firstName,
        event.lastName,
        event.birthday,
        event.address,
        event.gender,
        event.cabinet,
        event.position,
        event.specializationID,
        event.credentialID)),
    );
  }
}