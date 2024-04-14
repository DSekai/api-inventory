import { PartialType } from '@nestjs/mapped-types'
import { CreateProductDto } from './create-product.dto'
import { IsISO8601, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @MinLength(2)
  @IsOptional()
    name: string

  @IsInt()
  @Min(1)
  @IsOptional()
    quantity: number

  @IsISO8601()
  @IsOptional()
    date_expire?: string

  @IsString()
  @IsOptional()
    category: string

  @IsInt()
  @Min(1)
  @IsOptional()
    price: number
}
