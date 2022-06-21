import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AbstractService } from '../../config/abstract.service';
import * as bcrypt from 'bcrypt';
import { CreateDto } from './dto/create.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {
    super(userRepository);
  }

  async createUser(body: CreateDto): Promise<Partial<User>> {
    const isExists: boolean = await this.nameExists(body.username);

    if (!isExists) {
      const hashPassword: string = await bcrypt.hash(body.password, 10);
      const savedUser: User = await this.create({
        ...body,
        password: hashPassword,
      });

      const { password, ...user } = savedUser;
      return user;
    } else {
      throw new HttpException('Username already in use', HttpStatus.CONFLICT);
    }
  }

  async login(loginUserDto: CreateDto) {
    const user: User = await this.findOne({ username: loginUserDto.username });
    if (user) {
      const isValidPassword = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (isValidPassword) {
        return this.authService.generateJwt(user);
      } else {
        throw new HttpException(
          'Login was not Successfully',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  private nameExists(username: string): Promise<boolean> {
    return this.findOne({ username }).then((user) => !!user);
  }
}
