import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type LoginUserDto, type CreateUserDto } from './dto'
import { PrismaService } from 'src/prisma.service'
import { type UUID } from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { type User, type IJwtPayload } from '../interfaces'
import { BcryptAdapter } from './common/adapters/encrypt-adapter'
import { handleErrorException } from 'src/common/utils/errorHandler'
import { EmailService } from 'src/email/email.service'

@Injectable()
export class AuthService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}

  async create (createUserDto: CreateUserDto) {
    try {
      const { activate, password, id, name, email, ...user } = await this.prisma.users.create({
        data: { ...createUserDto, password: BcryptAdapter.hashSync(createUserDto.password, 10) }
      })
      const token = this.getJwt({ id })

      await this.prisma.users.update({
        where: { id },
        data: { emailToken: token }
      })

      this.emailService.sendEmail({ name, email, token })

      return { user, token }
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

  async verifyEmail (emailToken: string) {
    this.verifyJwt(emailToken)

    try {
      const user = await this.prisma.users.findFirst({ where: { emailToken } })
      if (!user) throw new NotFoundException('User Not Found')
      if (user.emailVerify) throw new ForbiddenException('User already verified')
      user.activate = true
      user.emailToken = null
      user.emailVerify = true

      await this.prisma.users.update({
        where: { id: user.id },
        data: { ...user }
      })

      return {
        message: 'ok',
        statusCode: 200
      }
    } catch (error) {
      handleErrorException(error)
    }
  }

  private getJwt (payload: IJwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  private verifyJwt (token: string) {
    try {
      this.jwtService.verify(token)
    } catch (error) {
      handleErrorException(error)
    }
  }
}
