import { Controller, Post, Request, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto } from './dto/create.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateDto) {
    return this.userService.createUser(body);
  }
}
