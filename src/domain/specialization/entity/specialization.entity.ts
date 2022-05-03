import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class SpecializationEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly name: string;

  constructor(
    name: string,
    id: string = uuidv4(),
  ) {
    this.name = name;
    this.id = id;
  }

  get getID(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }
}
