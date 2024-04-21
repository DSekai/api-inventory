import { Module } from '@nestjs/common'
import { InventorysService } from './inventorys.service'
import { InventorysController } from './inventorys.controller'
import { PrismaService } from 'src/prisma.service'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [InventorysController],
  providers: [InventorysService, PrismaService],
  imports: [AuthModule]
})
export class InventorysModule {}
