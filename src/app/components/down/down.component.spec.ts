import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DownComponent } from './down.component';
import { CounterService } from '../../services/counter.service';

describe('DownComponent', () => {
  let component: DownComponent,
    fixture: ComponentFixture<DownComponent>,
    service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DownComponent,
        { provide: CounterService, useClass: CounterServiceMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DownComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CounterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when click on "DOWN" button', () => {
    it('should call "down" function from counterService', fakeAsync(() => {
      spyOn(service, 'down');
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      tick();
      expect(service.down).toHaveBeenCalled();
    }));
  });
});

class CounterServiceMock {
  down() {}
}
