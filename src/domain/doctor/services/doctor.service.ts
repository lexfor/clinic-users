import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IDoctorFetcher } from '../interfaces/fetcher.interface';
import { FullDoctorViewDto } from '../dto/view/full-doctor.view.dto';
import { UpdateDoctorFormDto } from '../dto/form/update-doctor.form.dto';
import { UpdateDoctorCommandUsecase } from '../usecase/commands/update-doctor.command.usecase';
import { DeleteDoctorCommandUsecase } from '../usecase/commands/delete-doctor.command.usecase';
import { DOCTOR_WORK_HOURS } from '../../../common/constants';

@Injectable()
export class DoctorService {
  constructor(
    private commandBus: CommandBus,
    @Inject('DOCTOR_FETCHER') private doctorFetcher: IDoctorFetcher,
  ) {
  }

  async getFullDoctors(specializationID: string): Promise<FullDoctorViewDto[]>{
    return await this.doctorFetcher.getFullDoctors(specializationID);
  }

  async getDoctor(id: string): Promise<FullDoctorViewDto>{
    return await this.doctorFetcher.getDoctor(id);
  }

  async getDoctorFreeTime(id: string, date: string): Promise<string[]>{
    const lockDates = await this.doctorFetcher.getDoctorAppointmentsOnDate(id, date.split('T')[0]);
    return DOCTOR_WORK_HOURS.filter((hour) => !lockDates.includes(hour));
  }

  async updateDoctor(id: string, form: UpdateDoctorFormDto): Promise<void>{
    await this.commandBus.execute(new UpdateDoctorCommandUsecase(
      id,
      form.firstName,
      form.lastName,
      form.gender,
      form.address,
      form.birthday,
      form.cabinet,
      form.position,
      form.specializationID,
    ));
  }

  async deleteDoctor(id: string): Promise<void>{
    await this.commandBus.execute(new DeleteDoctorCommandUsecase(id))
  }
}
