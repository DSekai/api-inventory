import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(4)
    name: string

  @IsEmail()
  @IsString()
    email: string

  @IsString()
  @MinLength(6)
    password: string
}
