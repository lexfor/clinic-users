import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IUserFetcher } from '../interfaces/fetcher.interface';
import { FullUserViewDto } from '../dto/view/full-user.view.dto';
import { DeletePatientUserCommandUsecase } from '../usecases/commands';

@Injectable()
export class PatientService {
  constructor(
    private commandBus: CommandBus,
    @Inject('USER_FETCHER') private userFetcher: IUserFetcher,
  ) {
  }

  async getFullPatients(): Promise<FullUserViewDto[]>{
    return await this.userFetcher.getFullUsers();
  }

  async deletePatient(id: string): Promise<void>{
    await this.commandBus.execute(new DeletePatientUserCommandUsecase(id));
  }
}
