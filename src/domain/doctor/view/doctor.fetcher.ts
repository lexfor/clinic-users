import { Inject, Injectable } from '@nestjs/common';
import { IDoctorFetcher } from '../interfaces/fetcher.interface';
import { DoctorMapper } from '../mapper/doctor.mapper';
import { FullDoctorViewDto } from '../dto/view/full-doctor.view.dto';

@Injectable()
export class DoctorFetcher implements IDoctorFetcher {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: DoctorMapper,
  ) {}

  async getFullDoctors(specializationID: string) : Promise<FullDoctorViewDto[]> {
    let specializationFilter: string = '';
    if (specializationID) {
      specializationFilter = `WHERE specializations.id = ${specializationID}`;
    }
    const sql = `SELECT 
                    doctors.id,
                    cabinet,
                    position,
                    users.first_name as firstName,
                    users.last_name as lastName,
                    users.gender,
                    users.address,
                    users.birthday,
                    users.photo,
                    specialization.name as specializationName
                    FROM doctors
                    INNER JOIN users ON users.id = user_id
                    INNER JOIN specializations as specialization ON specialization.id = specialization_id;
                    ${specializationFilter}`;
    const { rows } = await this.pool.query(sql);

    return rows;
  }

  async getDoctor(id: string) : Promise<FullDoctorViewDto> {
    const sql = `SELECT 
                    doctors.id,
                    cabinet,
                    position,
                    users.first_name as firstName,
                    users.last_name as lastName,
                    users.gender,
                    users.address,
                    users.birthday,
                    users.photo,
                    specialization.name as specializationName
                    FROM doctors
                    INNER JOIN users ON users.id = user_id
                    INNER JOIN specializations as specialization ON specialization.id = specialization_id
                    WHERE doctors.id = $1;`;
    const { rows } = await this.pool.query(sql, [id]);

    const [doctor] = rows;

    return doctor;
  }

  async getDoctorAppointmentsOnDate(id: string, date: string): Promise<string[]> {
    const sql = `SELECT 
                    appointments.date
                    FROM appointments
                    WHERE date >= CAST($2 AS DATE)
                    AND date < (CAST($2 AS DATE) + 
                    CAST('1 day' AS INTERVAL))
                    AND appointments.doctor_id = $1;`;
    const { rows } = await this.pool.query(sql, [id, date]);
    return rows.map((row) => {
      const date = new Date(row.date);
      return `${date.getHours()}:0${date.getMinutes()}`;
    });
  }
}