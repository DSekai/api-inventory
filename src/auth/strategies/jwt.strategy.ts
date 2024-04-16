import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma.service'
import { ConfigService } from '@nestjs/config'
import { type IJwtPayload } from '../../interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly prisma: PrismaService,
    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate ({ id }: IJwtPayload) {
    const user = await this.prisma.users.findUnique({ where: { id } })

    if (!user) throw new UnauthorizedException('Token not valid')
    if (!user.activate) throw new UnauthorizedException('User is inactive')
    if (!user.emailVerify) throw new UnauthorizedException('Unveried user')

    return user
  }
}
