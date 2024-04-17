import { PartialType } from '@nestjs/mapped-types'
import { CreateCategoryDto } from './create-category.dto'
import { IsString, IsUUID, MinLength } from 'class-validator'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  //* Relation User
  // @IsBoolean()
  //   enabled: boolean

  //* Props
  @IsUUID()
    id: string

  @IsString()
  @MinLength(1)
    name: string
}
