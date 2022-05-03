import { Controller, Delete, Get, HttpException, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { FullUserViewDto } from '../dto/view/full-user.view.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async getFullPatients(@Req() req): Promise<FullUserViewDto[]> {
    if (req.user.role === 'admin') {
      return await this.patientService.getFullPatients();
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Delete('/:id')
  async deletePatient(@Param('id')id: string, @Req() req): Promise<void> {
    if (req.user.role === 'admin') {
      return await this.patientService.deletePatient(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }
}
