import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { ICreateUserDto } from '@app/user/dto/createuser.dto';
import { LoginDto } from './dto/loginuser.dto';
import { IUserResponse } from './interfaces/user_response.interface';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async createUser(createUserDto: ICreateUserDto): Promise<UserEntity> {
    const findedUser = await this.entityManager
      .getRepository(UserEntity)
      .findOne({
        where: {
          email: createUserDto.email,
        },
      });
    console.log('email:', createUserDto.email);
    console.log('findedUser', findedUser);
    if (findedUser) {
      throw new HttpException(
        'Email already in use',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    console.log('newUser', newUser);
    const user = await this.entityManager
      .getRepository(UserEntity)
      .save(newUser);
    return user;
  }

  buildUserResponse(user: UserEntity): any {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      'test',
    );
  }

  async login(loginDto: LoginDto): Promise<IUserResponse> {
    const findedUser = await this.entityManager
      .getRepository(UserEntity)
      .findOne({
        where: {
          email: loginDto.email,
        },
        select: ['id', 'username', 'email', 'password'],
      });

    if (!findedUser) {
      throw new HttpException('Not founded', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(
      loginDto.password,
      findedUser.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.buildUserResponse(findedUser);
  }
}
