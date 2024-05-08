import { PartialType } from '@nestjs/mapped-types'
import { CreateProductDto } from './create-product.dto'
import { IsISO8601, IsOptional, IsString, IsUUID, MinLength } from 'class-validator'

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsUUID()
  @IsString()
    id: string

  @IsString()
  @MinLength(2)
  @IsOptional()
    name?: string

  @IsString()
  @IsOptional()
    quantity?: string

  @IsISO8601()
  @IsOptional()
    date_expire?: string

  @IsString()
  @IsOptional()
    category?: string

  @IsString()
  @IsOptional()
    price?: string
}
