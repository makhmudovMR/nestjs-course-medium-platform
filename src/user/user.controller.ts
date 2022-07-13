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
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}
