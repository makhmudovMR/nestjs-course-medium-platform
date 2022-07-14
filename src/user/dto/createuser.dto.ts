import { IsEmail, IsNotEmpty } from 'class-validator';

export class ICreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
