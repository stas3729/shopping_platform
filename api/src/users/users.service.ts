import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly usersRepository: Repository<User>,
  ) {}

  async signUp(dto: CreateUserDto): Promise<{ msg: string }> {
    const isUsernameUsed = await this.findByUsername(dto.username);
    if (isUsernameUsed) {
      throw new ConflictException('This username is already taken.');
    }
    const user = this.usersRepository.create(dto);
    user.password = await bcrypt.hash(user.password, 10);
    await this.usersRepository.save(user);
    return {
      msg: 'You are successfully registered!',
    };
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  getAllUsers() {
    return this.usersRepository.find();
  }
}
