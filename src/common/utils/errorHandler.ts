import { ConflictException, InternalServerErrorException } from '@nestjs/common'

export const handleErrorException = (error: any, data?: string) => {
  if (error.code === 'P2025') throw new ConflictException(error.meta.cause)
  if (error.code === 'P2002') throw new ConflictException(`${data} already used!`)
  throw new InternalServerErrorException()
}
