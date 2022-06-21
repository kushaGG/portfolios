import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AbstractService } from '../../config/abstract.service';
import * as bcrypt from 'bcrypt';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
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

  private nameExists(username: string): Promise<boolean> {
    return this.findOne({ username }).then((user) => !!user);
  }
}
