import { TestBed } from '@angular/core/testing';

import { CounterService } from './counter.service';
import { DataService } from './data.service';

describe('CounterService', () => {
  let counterService: CounterService, dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CounterService,
        { provide: DataService, useClass: DataServiceMock },
      ],
    });
    counterService = TestBed.inject(CounterService);
    dataService = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(counterService).toBeTruthy();
  });

  describe('when up is called', () => {
    beforeEach(() => {
      counterService.count = 1;
      counterService.step = 2;
      spyOn(counterService, 'handleStep');
      spyOn(dataService, 'storeCount');
      counterService.up();
    });
    it(`should increase count by "step" units`, () => {
      expect(counterService.count).toEqual(3);
    });
    it('should call handleStep', () => {
      expect(counterService.handleStep).toHaveBeenCalled();
    });
    it('should call storeCount from dataService with counterService.count', () => {
      expect(dataService.storeCount).toHaveBeenCalledWith(3);
    });
  });
  describe('when down is called', () => {
    beforeEach(() => {
      counterService.count = 1;
      counterService.step = 2;
      spyOn(counterService, 'handleStep');
      spyOn(dataService, 'storeCount');
      counterService.down();
    });
    it(`should decrease count by "step" units`, () => {
      expect(counterService.count).toEqual(-1);
    });
    it('should call handleStep', () => {
      expect(counterService.handleStep).toHaveBeenCalled();
    });
    it('should call storeCount from dataService with counterService.count', () => {
      expect(dataService.storeCount).toHaveBeenCalledWith(-1);
    });
  });
  describe('when handleStep is called', () => {
    describe('when actionCounter%30 is not 0', () => {
      beforeEach(() => {
        counterService.actionCounter = 29;
        counterService.step = 4;
      });

      it('should not double the step', () => {
        counterService.handleStep();
        expect(counterService.step).toEqual(4);
      });
    });
    describe('when actionCounter%30 is 0', () => {
      beforeEach(() => {
        counterService.actionCounter = 30;
        counterService.step = 4;
      });
      it('should double the step', () => {
        counterService.handleStep();
        expect(counterService.step).toEqual(8);
      });
    });
  });
  describe('when resetCount is called', () => {
    beforeEach(() => {
      counterService.count = 9;
      spyOn(dataService, 'storeCount');
      counterService.resetCount();
    });
    it('should set count to 0', () => {
      expect(counterService.count).toEqual(0);
    });
    it('should call storeCount from dataService with 0', () => {
      expect(dataService.storeCount).toHaveBeenCalledWith(0);
    });
  });
});

class DataServiceMock {
  storeCount() {}
  fetchCount() {}
}
