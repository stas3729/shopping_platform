import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
