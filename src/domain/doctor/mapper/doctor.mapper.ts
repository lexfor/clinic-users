import { IDoctor } from '../interfaces/doctor.interface';
import { DoctorEntity } from '../entity/doctor.entity';

export class DoctorMapper {
  toEntity(doctor: IDoctor): DoctorEntity{
    return new DoctorEntity(
      doctor.user_id,
      doctor.cabinet,
      doctor.position,
      doctor.specialization_id,
      doctor.id,
    );
  }

  toRow(doctor: DoctorEntity): IDoctor {
    return {
      id: doctor.getID,
      cabinet: doctor.getCabinet,
      position: doctor.getPosition,
      specialization_id: doctor.getSpecializationID,
      user_id: doctor.getUserID,
    };
  }
}
