import { Injectable } from '@nestjs/common'
import { type CreateInventoryDto } from './dto/create-inventory.dto'
import { type UpdateInventoryDto } from './dto/update-inventory.dto'
import { PrismaService } from 'src/prisma.service'
import { handleErrorException } from 'src/common/utils/errorHandler'
import { type User } from 'src/interfaces'
import { type UUID } from 'crypto'

@Injectable()
export class InventorysService {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async create (createInventoryDto: CreateInventoryDto, user: User) {
    console.log(1)

    try {
      return await this.prisma.inventories.create({ data: { name: createInventoryDto.name, description: createInventoryDto.description, user_id: user.id } })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async findAll (user: User) {
    try {
      return await this.prisma.inventories.findMany({
        where: {
          user_id: user.id
        }
      })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async update (updateInventoryDto: UpdateInventoryDto, user: User) {
    console.log(user)

    try {
      return await this.prisma.inventories.update({
        where: {
          id: updateInventoryDto.id,
          user_id: user.id
        },
        data: {
          name: updateInventoryDto.name,
          description: updateInventoryDto.description
        }
      })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async remove (id: UUID, user: User) {
    try {
      return await this.prisma.inventories.update({
        where: {
          id,
          user_id: user.id
        },
        data: {
          active: false
        }
      })
    } catch (error) {

    }
  }
}
