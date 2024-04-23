import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [AuthModule]

})
export class ProductModule {}
