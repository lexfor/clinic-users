import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_PHOTO_PATH } from '../../../config/global.env';

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
  private readonly address: string;
  @ApiProperty()
  private readonly birthday: string;
  @ApiProperty()
  private readonly photo: string;
  @ApiProperty()
  private readonly credentialID: string;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    address: string,
    birthday: string,
    credentialID: string,
    id: string = uuidv4(),
    photo: string = DEFAULT_PHOTO_PATH,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.address = address;
    this.birthday = birthday;
    this.credentialID = credentialID;
    this.id = id;
    this.photo = photo;
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

  get getAddress(): string {
    return this.address;
  }

  get getPhoto(): string {
    return this.photo;
  }

  get getBirthday(): string {
    return this.birthday;
  }

  get getAge(): number {
    return (
      +new Date().toISOString().substring(0, 4) - +this.birthday.substring(0, 4)
    );
  }

  get getCredentialID(): string {
    return this.credentialID;
  }
}
