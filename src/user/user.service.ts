import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async createUser(createUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    console.log('newUser', newUser);
    return await this.entityManager.getRepository(UserEntity).save(newUser);
  }
}
