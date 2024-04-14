import { IsInt, IsString, MinLength, Min, IsOptional, IsISO8601 } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @MinLength(2)
    name: string

  @IsInt()
  @Min(1)
    quantity: number

  @IsISO8601()
  @IsOptional()
    date_expire: string

  @IsString()
    category: string

  @IsInt()
  @Min(1)
    price: number
}
