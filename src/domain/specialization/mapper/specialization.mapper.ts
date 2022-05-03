import { ISpecialization } from '../interfaces/specialization.interface';
import { SpecializationEntity } from '../entity/specialization.entity';

export class SpecializationMapper {
  toEntity(specialization: ISpecialization): SpecializationEntity {
    return new SpecializationEntity(
      specialization.name,
      specialization.id,
    );
  }

  toRow(specialization: SpecializationEntity): ISpecialization {
    return {
      id: specialization.getID,
      name: specialization.getName,
    };
  }
}
