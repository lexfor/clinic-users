import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findPatient(@Query('name') name: string, @Req() req): Promise<UserEntity[]> {
      return await this.userService.findPatient(name);
  }
}
