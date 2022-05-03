import { IDoctor } from './doctor.interface';
import { DoctorEntity } from '../entity/doctor.entity';

export interface IDoctorRepository {
  createDoctor: (doctor: IDoctor) => Promise<DoctorEntity>;
  deleteDoctor: (id: string) => Promise<void>;
  updateDoctor: (doctor: IDoctor) => Promise<DoctorEntity>;
  getDoctor: (id: string) => Promise<DoctorEntity>;
}
