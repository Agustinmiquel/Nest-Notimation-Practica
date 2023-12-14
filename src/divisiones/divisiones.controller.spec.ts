import { Test, TestingModule } from '@nestjs/testing';
import { DivisionesController } from './divisiones.controller';
import { DivisionesService } from './divisiones.service';

describe('DivisionesController', () => {
  let controller: DivisionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DivisionesController],
      providers: [DivisionesService],
    }).compile();

    controller = module.get<DivisionesController>(DivisionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
