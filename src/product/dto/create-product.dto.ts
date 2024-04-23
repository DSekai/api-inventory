import { IsInt, IsString, MinLength, Min, IsOptional, IsISO8601, IsUUID } from 'class-validator'

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
  @IsUUID()
    category: string

  @IsInt()
  @Min(0)
    price?: number

  @IsString()
  @IsUUID()
    inventory_id: string
}
