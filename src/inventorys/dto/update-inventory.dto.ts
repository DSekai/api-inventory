import { PartialType } from '@nestjs/mapped-types'
import { CreateInventoryDto } from './create-inventory.dto'
import { IsString } from 'class-validator'

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @IsString()
    name?: string

  @IsString()
    description?: string
}
