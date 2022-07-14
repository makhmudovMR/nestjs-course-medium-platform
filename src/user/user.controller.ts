import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserDto } from './dto/createuser.dto';
import { LoginDto } from './dto/loginuser.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: ICreateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
