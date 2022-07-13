import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async createUser(createUserDto): Promise<UserEntity> {
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
}
