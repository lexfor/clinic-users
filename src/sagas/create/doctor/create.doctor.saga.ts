import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreateDoctorEvent } from './events';
import { CreateDoctorCommandUsecase } from '../../../domain/doctor/usecase/commands/create-doctor.command.usecase';

export class CreateDoctorSaga{
  @Saga()
  execute(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(CreateDoctorEvent),
      map((event: CreateDoctorEvent) => new CreateDoctorCommandUsecase(
        event.actionID,
        event.cabinet,
        event.position,
        event.specializationID,
        event.userID)),
    );
  }
}