import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFullUserDto } from '../dto/create-fullUser.dto';

@Injectable()
export class UserEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly firstName: string;
  @ApiProperty()
  private readonly lastName: string;
  @ApiProperty()
  private readonly gender: string;
  @ApiProperty()
  private readonly birthday: string;
  @ApiProperty()
  private readonly photo: string;
  @ApiProperty()
  private readonly role: string;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    birthday: string,
    photo: string,
    role: string,
    id: string = uuidv4(),
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.birthday = birthday;
    this.photo = photo;
    this.role = role;
    this.id = id;
  }

  static async create(userDto: CreateFullUserDto): Promise<UserEntity> {
    return new UserEntity(
      userDto.firstName,
      userDto.lastName,
      userDto.gender,
      userDto.birthday,
      userDto.photo,
      userDto.role,
    );
  }

  get getID(): string {
    return this.id;
  }

  get getFirstName(): string {
    return this.firstName;
  }

  get getLastName(): string {
    return this.lastName;
  }

  get getGender(): string {
    return this.gender;
  }

  get getBirthday(): string {
    return this.birthday;
  }

  get getPhoto(): string {
    return this.photo;
  }

  get getRole(): string {
    return this.role;
  }

  get getAge(): number {
    return (
      +new Date().toISOString().substring(0, 4) - +this.birthday.substring(0, 4)
    );
  }
}
