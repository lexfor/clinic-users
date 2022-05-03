import { Inject, Injectable } from '@nestjs/common';
import { SpecializationMapper } from '../mapper/specialization.mapper';
import { SpecializationEntity } from '../entity/specialization.entity';
import { ISpecializationFetcher } from '../interfaces/fetcher.interface';

@Injectable()
export class SpecializationFetcher implements ISpecializationFetcher {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: SpecializationMapper,
  ) {}

  async getSpecializations() : Promise<SpecializationEntity[]> {
    const sql = `SELECT * FROM specializations;`;
    const { rows } = await this.pool.query(sql);

    return rows.map(specialization => this.mapper.toEntity(specialization));
  }
}