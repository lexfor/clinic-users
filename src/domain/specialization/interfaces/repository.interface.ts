import { ISpecialization } from './specialization.interface';
import { SpecializationEntity } from '../entity/specialization.entity';

export interface ISpecializationRepository {
  createSpecialization: (specialization: ISpecialization) => Promise<SpecializationEntity>;
  deleteSpecialization: (id: string) => Promise<void>;
}
