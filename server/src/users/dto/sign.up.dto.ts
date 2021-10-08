import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public nickname: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
