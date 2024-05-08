import { IsString, MinLength, IsOptional, IsISO8601, IsUUID } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @MinLength(2)
    name: string

  @IsString()
    quantity: string

  @IsISO8601()
  @IsOptional()
    date_expire: string

  @IsString()
  @IsUUID()
    category: string

  @IsString()
  @IsOptional()
    price?: string

  @IsString()
  @IsUUID()
    inventory_id: string
}
