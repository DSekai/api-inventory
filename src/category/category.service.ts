import { Injectable } from '@nestjs/common'
import { type CreateCategoryDto } from './dto/create-category.dto'
import { type UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from 'src/prisma.service'
import { type User } from 'src/interfaces'
import { handleErrorException } from 'src/common/utils/errorHandler'
import { type UUID } from 'crypto'

@Injectable()
export class CategoryService {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async create (createCategoryDto: CreateCategoryDto, user: User) {
    try {
      return await this.prisma.userCategory.create({ data: { user_id: user.id, name: createCategoryDto.name } })
    } catch (error) {
      handleErrorException(error, 'Category')
    }
  }

  async validate (createCategoryDto: CreateCategoryDto, user: User) {
    try {
      if (!createCategoryDto.id) return await this.create(createCategoryDto, user)
      const categoryFound = await this.findOne(createCategoryDto, user)

      return await this.update(user, { id: categoryFound.id, ...createCategoryDto })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async findAll (user: User) {
    try {
      return await this.prisma.userCategory.findMany({
        where: {
          user_id: user.id
        },
        select: {
          id: true,
          name: true
        }
      })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async findOne (createCategoryDto: CreateCategoryDto, user: User) {
    return await this.prisma.userCategory.findFirst({
      where: {
        id: createCategoryDto.id
        // AND: [{ user_id: user.id }, { id: createCategoryDto.id }]
      }
    })
  }

  async update (user: User, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.userCategory.update({ where: { id: updateCategoryDto.id }, data: { name: updateCategoryDto.name } })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async remove (id: UUID, user: User) {
    try {
      return await this.prisma.userCategory.delete({ where: { id, user_id: user.id } })
    } catch (error) {
      handleErrorException(error)
    }
  }
}
