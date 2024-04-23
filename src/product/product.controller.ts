import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseUUIDPipe } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto, UpdateProductDto } from './dto'
import { AuthGuard } from '@nestjs/passport'
import { type User } from 'src/interfaces'
import { UUID } from 'crypto'

@Controller('product')
export class ProductController {
  constructor (private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create (@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto)
  }

  @Get('all/:id')
  @UseGuards(AuthGuard())
  async findAll (@Param('id', ParseUUIDPipe) inventoryID: UUID, @Req() req: Express.Request) {
    return await this.productService.findAll(inventoryID, req.user as User)
  }

  @Get(':inventoryID/:productName')
  @UseGuards(AuthGuard())
  async findOne (
  @Param('inventoryID', ParseUUIDPipe) inventoryID: UUID,
    @Param('productName') product: string,
    @Req() req: Express.Request
  ) {
    return await this.productService.findOne(inventoryID, req.user as User, product)
  }

  @Patch()
  @UseGuards(AuthGuard())
  async update (@Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(updateProductDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove (@Param('id', ParseUUIDPipe) productID: UUID) {
    return await this.productService.remove(productID)
  }
}
