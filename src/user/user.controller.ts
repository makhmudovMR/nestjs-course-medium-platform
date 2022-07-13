import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserDto } from './dto/createuser.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('user') createUserDto: ICreateUserDto,
  ): Promise<UserEntity> {
    console.log('createUser', createUserDto);
    return this.userService.createUser(createUserDto);
  }
}
