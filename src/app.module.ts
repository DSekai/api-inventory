import { Module } from '@nestjs/common'
import { InventorysModule } from './inventorys/inventorys.module'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [InventorysModule, ProductModule, CategoryModule, AuthModule]
})
export class AppModule {}
