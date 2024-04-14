import { Module } from '@nestjs/common';
import { InventorysService } from './inventorys.service';
import { InventorysController } from './inventorys.controller';

@Module({
  controllers: [InventorysController],
  providers: [InventorysService],
})
export class InventorysModule {}
