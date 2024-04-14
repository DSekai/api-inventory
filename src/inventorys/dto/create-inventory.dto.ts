import { IsString, IsUUID } from 'class-validator'

export class CreateInventoryDto {
  @IsString()
    name: string

  @IsString()
    description: string

  @IsUUID()
    user_id: string
}
