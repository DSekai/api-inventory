import { Module } from '@nestjs/common'
import { InventorysModule } from './inventorys/inventorys.module'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { AuthModule } from './auth/auth.module'
import { EmailModule } from './email/email.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InventorysModule,
    ProductModule,
    CategoryModule,
    AuthModule,
    EmailModule
  ]
})
export class AppModule {}
