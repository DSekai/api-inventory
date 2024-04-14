import { Test, TestingModule } from '@nestjs/testing';
import { InventorysController } from './inventorys.controller';
import { InventorysService } from './inventorys.service';

describe('InventorysController', () => {
  let controller: InventorysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventorysController],
      providers: [InventorysService],
    }).compile();

    controller = module.get<InventorysController>(InventorysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
