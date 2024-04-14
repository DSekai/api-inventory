import { IsString, IsUUID, MinLength } from 'class-validator'

export class CreateCategoryDto {
  // Relation User
  @IsUUID()
    userid: string

  // Props
  @IsString()
  @MinLength(1)
    name: string
}
