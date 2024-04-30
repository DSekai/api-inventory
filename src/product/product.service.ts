import { Injectable } from '@nestjs/common'
import { type CreateProductDto } from './dto/create-product.dto'
import { type UpdateProductDto } from './dto/update-product.dto'
import { handleErrorException } from 'src/common/utils/errorHandler'
import { PrismaService } from 'src/prisma.service'
import { type User } from 'src/interfaces'
import { type UUID } from 'crypto'

@Injectable()
export class ProductService {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async create (createProductDto: CreateProductDto) {
    const { name, date_expire: dateExpire, ...data } = createProductDto
    try {
      return await this.prisma.products.create({
        data: {
          name: name.toLowerCase(),
          date_expire: new Date(dateExpire),
          ...data
        }
      })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async findAll (inventoryID: UUID, user: User) {
    try {
      const data = await this.prisma.products.findMany({
        where: {
          inventory: { user_id: user.id, active: true, id: inventoryID }
        },
        select: {
          id: true,
          name: true,
          price: true,
          quantity: true,
          date_expire: true,
          categoryRef: { select: { name: true, id: true } }
        }
      })
      return data.map((product) => ({
        ...product,
        date_expire: product.date_expire.toISOString().split('T').at(0),
        category: product.categoryRef,
        categoryRef: undefined
      }))
    } catch (error) {
      handleErrorException(error)
    }
  }

  async findOne (inventoryID: UUID, user: User, product: string) {
    console.log(user.id)

    try {
      return await this.prisma.products.findMany({
        where: {
          name: {
            contains: product.toLowerCase()
          },
          inventory_id: inventoryID,
          inventory: { user_id: user.id }
        }
      })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async update (updateProductDto: UpdateProductDto) {
    const { name, date_expire: dateExpire, ...data } = updateProductDto
    try {
      return await this.prisma.products.update({
        where: {
          id: updateProductDto.id
        },
        data: {
          name: name.toLowerCase(),
          date_expire: new Date(dateExpire),
          ...data
        }
      })
    } catch (error) {
      handleErrorException(error)
    }
  }

  async remove (productID: UUID) {
    try {
      return await this.prisma.products.delete({
        where: {
          id: productID
        }
      })
    } catch (error) {
      handleErrorException(error)
    }
  }
}
