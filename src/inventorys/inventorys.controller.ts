import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req, ParseUUIDPipe } from '@nestjs/common'
import { InventorysService } from './inventorys.service'
import { CreateInventoryDto, UpdateInventoryDto } from './dto'
import { AuthGuard } from '@nestjs/passport'
import { type User } from 'src/interfaces'
import { UUID } from 'crypto'

@Controller('inventories')
export class InventorysController {
  constructor (private readonly inventorysService: InventorysService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create (@Body() createInventoryDto: CreateInventoryDto, @Req() req: Express.Request) {
    return await this.inventorysService.create(createInventoryDto, req.user as User)
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async findAll (@Req() req: Express.Request) {
    return await this.inventorysService.findAll(req.user as User)
  }

  @Patch()
  @UseGuards(AuthGuard())
  async update (@Body() updateInventoryDto: UpdateInventoryDto, @Req() req: Express.Request) {
    return await this.inventorysService.update(updateInventoryDto, req.user as User)
  }

  @Patch('delete/:id')
  @UseGuards(AuthGuard())
  async remove (@Param('id', ParseUUIDPipe) id: UUID, @Req() req: Express.Request) {
    return await this.inventorysService.remove(id, req.user as User)
  }
}
