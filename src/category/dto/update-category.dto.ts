import { PartialType } from '@nestjs/mapped-types'
import { CreateCategoryDto } from './create-category.dto'
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  // Relation User
  @IsBoolean()
    enabled: boolean

  // Props
  @IsString()
  @MinLength(1)
  @IsOptional()
    name: string
}
