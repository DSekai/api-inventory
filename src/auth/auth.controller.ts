import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto } from './dto'
import { UUID } from 'crypto'
import { type User } from 'src/interfaces'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post()
  async create (@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto)
  }

  @Get()
  async findAll () {
    return await this.authService.findAll()
  }

  @Get(':id')
  async findOne (@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.authService.findOne(id)
  }

  @Post('login')
  async login (@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto)
  }

  @Patch('desactivate/:prop?')
  @UseGuards(AuthGuard())
  async updateActiveUser (@Param('prop') id: UUID, @Req() req: Express.Request) {
    return await this.authService.updateActive(id, (req.user as User))
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.authService.remove(+id)
  }
}
