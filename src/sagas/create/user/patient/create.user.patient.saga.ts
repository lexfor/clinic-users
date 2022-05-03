import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreateUserPatientEvent } from './events';
import { CreatePatientUserCommandUsecase } from '../../../../domain/user/usecases/commands';

export class CreateUserPatientSaga {
  @Saga()
  execute(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(CreateUserPatientEvent),
      map((event: CreateUserPatientEvent) => new CreatePatientUserCommandUsecase(
        event.actionID,
        event.firstName,
        event.lastName,
        event.birthday,
        event.address,
        event.gender,
        event.credentialID)),
    );
  }
}