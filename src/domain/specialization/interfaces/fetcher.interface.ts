import { SpecializationEntity } from '../entity/specialization.entity';

export interface ISpecializationFetcher {
  getSpecializations: () => Promise<SpecializationEntity[]>;
}
