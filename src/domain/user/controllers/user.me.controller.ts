import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { UserMeViewDto } from '../dto/view/user.me.view.dto';
import { UserService } from '../services/user.service';
import { UpdateUserFormDto } from '../dto/form/update-user.form.dto';

@Controller('user/me')
export class UserMeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req): Promise<UserMeViewDto> {
    return await this.userService.getMe(req.user.id, req.user.role);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateMe(@Req() req, @Body() dto: UpdateUserFormDto): Promise<void> {
    await this.userService.updateMe(req.user.id, dto);
  }
}
