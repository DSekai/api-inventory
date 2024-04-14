import { PartialType } from '@nestjs/mapped-types'
import { CreateInventoryDto } from './create-inventory.dto'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @IsString()
  @MinLength(1)
    name?: string

  @IsString()
  @IsOptional()
    description?: string
}
