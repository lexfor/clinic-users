import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class DoctorEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly cabinet: string;
  @ApiProperty()
  private readonly position: string;
  @ApiProperty()
  private readonly specializationID: string;
  @ApiProperty()
  private readonly userID: string;

  constructor(
    userID: string,
    cabinet: string,
    position: string,
    specializationID: string,
    id: string = uuidv4(),
  ) {
    this.userID = userID;
    this.cabinet = cabinet;
    this.position = position;
    this.specializationID = specializationID;
    this.id = id;
  }

  get getID(): string {
    return this.id;
  }

  get getCabinet(): string {
    return this.cabinet;
  }

  get getPosition(): string {
    return this.position;
  }

  get getUserID(): string {
    return this.userID;
  }

  get getSpecializationID(): string {
    return this.specializationID;
  }
}
