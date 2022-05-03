import { Inject, Injectable } from '@nestjs/common';
import { IDoctorRepository } from '../interfaces/repository.interface';
import { DoctorMapper } from '../mapper/doctor.mapper';
import { IDoctor } from '../interfaces/doctor.interface';
import { DoctorEntity } from './doctor.entity';

@Injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: DoctorMapper,
  ) {}

  async createDoctor(doctor: IDoctor) : Promise<DoctorEntity> {
    const sql = `INSERT INTO doctors (
                 id, 
                 cabinet,
                 position,
                 specialization_id,
                 user_id
                 ) VALUES ($1, $2, $3, $4, $5);`;
    await this.pool.query(sql, [
      doctor.id,
      doctor.cabinet,
      doctor.position,
      doctor.specialization_id,
      doctor.user_id,
    ]);

    return this.mapper.toEntity(doctor);
  }

  async deleteDoctor(id: string) : Promise<void> {
    const sql = `DELETE FROM doctors WHERE id = $1`;
    await this.pool.query(sql, [id]);
  }

  async updateDoctor(doctor: IDoctor) : Promise<DoctorEntity> {
    const sql = `UPDATE doctors SET cabinet = $1, position = $2, specialization_id = $3 WHERE id = $4;`;
    await this.pool.query(sql, [
      doctor.cabinet,
      doctor.position,
      doctor.specialization_id,
      doctor.id,
    ]);

    return this.mapper.toEntity(doctor);
  }

  async getDoctor(id: string) : Promise<DoctorEntity> {
    const sql = `SELECT * FROM doctors WHERE id = $1`;
    const { rows } = await this.pool.query(sql, [id]);
    const [doctor] = rows;
    return this.mapper.toEntity(doctor);
  }
}