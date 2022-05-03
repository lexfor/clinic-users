import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SpecializationService } from '../services/specialization.service';
import { CreateSpecializationFormDto } from '../dto/form/create-specialization.form.dto';
import { SpecializationEntity } from '../entity/specialization.entity';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post()
  async create(@Body() form: CreateSpecializationFormDto, @Req() req): Promise<void> {
    if (req.user.role === 'admin') {
      await this.specializationService.createSpecialization(form);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req): Promise<void> {
    if (req.user.role === 'admin') {
      await this.specializationService.deleteSpecialization(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async getAll(@Req() req): Promise<SpecializationEntity[]> {
    if (req.user.role === 'patient' || req.user.role === 'admin') {
      return await this.specializationService.getAllSpecializations();
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }
}
