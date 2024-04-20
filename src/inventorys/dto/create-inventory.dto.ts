import { IsOptional, IsString, MinLength } from 'class-validator'

export class CreateInventoryDto {
  @IsString()
  @MinLength(1)
    name: string

  @IsString()
  @IsOptional()
    description?: string

  // @IsUUID()
  //   user_id: string
}
