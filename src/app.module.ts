import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@app/tag/tag.entity';
import { UserModule } from '@app/user/user.module';
import { UserEntity } from '@app/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mediumclone',
      password: '123',
      database: 'mediumclone',
      entities: [TagEntity, UserEntity],
      synchronize: true,
    }),
    TagModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
