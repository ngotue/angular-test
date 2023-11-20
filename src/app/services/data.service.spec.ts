import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when fetchCount is called', () => {
    it('should fetch "count" from localstorage (call localstorage.getItem with parameter "count")', () => {
      spyOn(localStorage, 'getItem');
      service.fetchCount();
      expect(localStorage.getItem).toHaveBeenCalledWith('count');
    });
    describe('when count does not exist in localstorage', () => {
      it('should return 0', () => {
        expect(service.fetchCount()).toEqual(0);
      });
    });
    describe('when count is not a number', () => {
      it('should return 0', () => {
        localStorage.setItem('count', 'acbasdfasdf');
        expect(service.fetchCount()).toEqual(0);
        localStorage.setItem('count', '[]');
        expect(service.fetchCount()).toEqual(0);
      });
    });
    describe('when count exists in localstorage', () => {
      it('should return count as a number', () => {
        localStorage.setItem('count', '123123123');
        expect(service.fetchCount()).toEqual(123123123);
      });
    });
  });

  describe('when storeCount is called with parameter 999', () => {
    it('should store "count" as "999" in localstorage', () => {
      spyOn(localStorage, 'setItem');
      service.storeCount(999);
      expect(localStorage.setItem).toHaveBeenCalledWith('count', '999');
    });
  });
});
