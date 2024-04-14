import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @MinLength(4)
    name?: string

  @IsString()
  @IsEmail()
  @IsOptional()
    email?: string

  @IsString()
  @MinLength(6)
  @IsOptional()
    currentPassword?: string

  @IsString()
  @MinLength(6)
  @IsOptional()
    newPassowrd?: string
}
