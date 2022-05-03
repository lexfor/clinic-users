import { Inject, Injectable } from '@nestjs/common';
import { ISpecialization } from '../interfaces/specialization.interface';
import { SpecializationMapper } from '../mapper/specialization.mapper';
import { SpecializationEntity } from './specialization.entity';
import { ISpecializationRepository } from '../interfaces/repository.interface';

@Injectable()
export class SpecializationRepository implements ISpecializationRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: SpecializationMapper,
  ) {}

  async createSpecialization(specialization: ISpecialization) : Promise<SpecializationEntity> {
    const sql = `INSERT INTO specializations (
                 id, 
                 name
                 ) VALUES ($1, $2);`;
    await this.pool.query(sql, [
      specialization.id,
      specialization.name,
    ]);

    return this.mapper.toEntity(specialization);
  }

  async deleteSpecialization(id: string) : Promise<void> {
    const sql = `DELETE FROM specializations WHERE id = $1`;
    await this.pool.query(sql, [id]);
  }
}