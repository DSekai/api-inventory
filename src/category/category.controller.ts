import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto, UpdateCategoryDto } from './dto'
import { AuthGuard } from '@nestjs/passport'
import { type User } from 'src/interfaces'

@Controller('category')
export class CategoryController {
  constructor (private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create (@Body() createCategoryDto: CreateCategoryDto, @Req() req: Express.Request) {
    await this.categoryService.validate(createCategoryDto, req.user as User)
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async findAll (@Req() req: Express.Request) {
    return await this.categoryService.findAll(req.user as User)
  }

  @Get(':id')
  async findOne (@Param('category') createCategoryDto: CreateCategoryDto) {
    // return await this.categoryService.findOne(createCategoryDto)
  }

  @Patch(':id')
  async update (@Param('id') id: User, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(id, updateCategoryDto)
  }

  @Delete()
  @UseGuards(AuthGuard())
  async remove (@Body() CreateCategoryDto: CreateCategoryDto, @Req() req: Express.Request) {
    return await this.categoryService.remove(CreateCategoryDto, req.user as User)
  }
}
