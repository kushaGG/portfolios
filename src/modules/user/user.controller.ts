import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto } from './dto/create.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateDto) {
    return this.userService.createUser(body);
  }

  @Post('login')
  login(@Body() loginUserDto: CreateDto) {
    return this.userService.login(loginUserDto).then((jwt: string) => {
      return {
        access_token: jwt,
        token_type: 'JWT',
        expires_in: 10000,
      };
    });
  }
}
