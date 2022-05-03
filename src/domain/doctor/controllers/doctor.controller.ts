import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException, HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from '../services/doctor.service';
import { FullDoctorViewDto } from '../dto/view/full-doctor.view.dto';
import { UpdateDoctorFormDto } from '../dto/form/update-doctor.form.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async getFullDoctors(
    @Query('specializationID') specializationID: string,
    @Req() req,
  ): Promise<FullDoctorViewDto[]> {
    if (req.user.role === 'admin' || req.user.role === 'patient') {
      return await this.doctorService.getFullDoctors(specializationID);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id')
  async getDoctor(@Param('id') id: string, @Req() req): Promise<FullDoctorViewDto> {
    if (req.user.role === 'patient') {
      return await this.doctorService.getDoctor(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id/:date')
  async getDoctorFreeTime(@Param('id') id: string, @Param('date') date: string): Promise<string[]> {
      return await this.doctorService.getDoctorFreeTime(id, date);
  }

  @Patch('/:id')
  async updateDoctor(
    @Param('id') id: string,
    @Body() form: UpdateDoctorFormDto,
    @Req() req,
    ): Promise<void> {
    if (req.user.role === 'admin') {
      await this.doctorService.updateDoctor(id, form);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Delete('/:id')
  async deleteDoctor(
    @Param('id') id: string,
    @Req() req,
  ): Promise<void> {
    if (req.user.role === 'admin') {
      await this.doctorService.deleteDoctor(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }
}
