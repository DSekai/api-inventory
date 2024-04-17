import { IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateCategoryDto {
  // Relation User
  // @IsUUID()
  //   user_id: string

  // Props
  @IsString()
    name: string

  @IsUUID()
  @IsOptional()
    id?: string
}
