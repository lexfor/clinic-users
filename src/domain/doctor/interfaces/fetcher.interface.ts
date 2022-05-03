import { FullDoctorViewDto } from '../dto/view/full-doctor.view.dto';

export interface IDoctorFetcher {
  getFullDoctors: (specializationID: string) => Promise<FullDoctorViewDto[]>;
  getDoctor: (id: string) => Promise<FullDoctorViewDto>;
  getDoctorAppointmentsOnDate: (id: string, date: string) => Promise<string[]>;
}
