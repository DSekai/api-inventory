import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  imports: [AuthModule]
})
export class CategoryModule {}
