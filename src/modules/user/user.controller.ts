import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
} from '@nestjs/swagger';
import {
  IErrorResponse,
  ILoginResponse,
  IValidationErrorResponse,
} from '../../interfaces/response.interface';
import { User } from './user.entity';
import { LoginDto } from './dto/login.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Sign-up' })
  @ApiCreatedResponse({
    type: OmitType(User, ['password']),
    description: 'Success',
  })
  @ApiBadRequestResponse({
    type: IValidationErrorResponse,
    description: 'Validation error',
  })
  @Post()
  async create(@Body() body: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.userService.createUser(body);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ type: ILoginResponse, description: 'Success' })
  @ApiBadRequestResponse({
    type: IValidationErrorResponse,
    description: 'Validation error',
  })
  @ApiUnauthorizedResponse({
    type: IErrorResponse,
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({ type: IErrorResponse, description: 'Not Found' })
  @Post('login')
  login(@Body() loginUserDto: LoginDto): Promise<ILoginResponse> {
    return this.userService.login(loginUserDto).then((jwt: string) => {
      return {
        access_token: jwt,
        token_type: 'JWT',
        expires_in: 10000,
      };
    });
  }
}
