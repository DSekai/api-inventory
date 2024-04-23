import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  imports: [AuthModule]

})
export class ProductModule {}
