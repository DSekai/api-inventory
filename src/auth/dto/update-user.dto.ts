import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import { CreateuserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateuserDto) {
  @IsString()
  @MinLength(4)
    name: string

  @IsEmail()
  @IsString()
  @IsOptional()
    email: string

  @IsString()
  @MinLength(6)
  @IsOptional()
    currentPassword: string

  @IsString()
  @MinLength(6)
  @IsOptional()
    newPassword: string
}
