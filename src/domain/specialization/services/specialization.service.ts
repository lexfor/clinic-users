import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSpecializationFormDto } from '../dto/form/create-specialization.form.dto';
import { CreateSpecializationCommandUsecase } from '../usecase/commands/create-specialization.command.usecase';
import { SpecializationEntity } from '../entity/specialization.entity';
import { ISpecializationFetcher } from '../interfaces/fetcher.interface';
import { DeleteSpecializationCommandUsecase } from '../usecase/commands/delete-specialization.command.usecase';

@Injectable()
export class SpecializationService {
  constructor(
    private commandBus: CommandBus,
    @Inject('SPECIALIZATION_FETCHER') private specializationFetcher: ISpecializationFetcher,
  ) {
  }

  async createSpecialization(form: CreateSpecializationFormDto): Promise<void>{
    return await this.commandBus.execute(new CreateSpecializationCommandUsecase(form.name));
  }

  async deleteSpecialization(id: string): Promise<void>{
    return await this.commandBus.execute(new DeleteSpecializationCommandUsecase(id));
  }

  async getAllSpecializations(): Promise<SpecializationEntity[]>{
    return await this.specializationFetcher.getSpecializations();
  }
}
