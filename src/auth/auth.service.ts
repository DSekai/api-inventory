import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type LoginUserDto, type CreateUserDto } from './dto'
import { PrismaService } from 'src/prisma.service'
import { type UUID } from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { type User, type IJwtPayload } from '../interfaces'
import { BcryptAdapter } from './common/adapters/encrypt-adapter'
import { handleErrorException } from 'src/common/utils/errorHandler'

@Injectable()
export class AuthService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async create (createUserDto: CreateUserDto) {
    try {
      const { activate, emailToken, password, emailVerify, id, ...user } = await this.prisma.users.create({
        data: { ...createUserDto, password: BcryptAdapter.hashSync(createUserDto.password, 10) }
      })

      return { user, token: this.getJwt({ id }) }
    } catch (error) {
      handleErrorException(error, 'Email')
    }
  }

  async findAll () {
    return await this.prisma.users.findMany()
  }

  async findOne (id: UUID) {
    const user = await this.prisma.users.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User Not Found')
    return user
  }

  async login (loginUserDto: LoginUserDto) {
    try {
      const user = await this.prisma.users.findUnique({ where: { email: loginUserDto.email } })
      if (!user) throw new NotFoundException('User Not Found')

      const isValidate = BcryptAdapter.compareSync(loginUserDto.password, user.password)
      if (!isValidate) throw new UnauthorizedException('User or Password Incorrect')
      return { login: true, token: this.getJwt({ id: user.id }) }
    } catch (error) {
      console.log(error.code)
      handleErrorException(error)
    }
  }

  async updateActive (id: UUID, user?: User) {
    const userID = id ?? user.id

    try {
      const { activate } = await this.prisma.users.findUnique({
        where: { id: userID }
      })

      return await this.prisma.users.update({
        where: { id: userID },
        data: { activate: !activate }
      })
    } catch (error) {
      handleErrorException(error)
    }
  }

  private getJwt (payload: IJwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }
}
