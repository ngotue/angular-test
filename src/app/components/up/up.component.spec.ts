import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { UpComponent } from './up.component';
import { CounterService } from '../../services/counter.service';

describe('UpComponent', () => {
  let component: UpComponent;
  let fixture: ComponentFixture<UpComponent>;
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpComponent,
        { provide: CounterService, useClass: CounterServiceMock },
      ],
    });
    fixture = TestBed.createComponent(UpComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CounterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when click on UP button', () => {
    it('should invoke "up" function from CounterService', fakeAsync(() => {
      spyOn(service, 'up');
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      tick();
      expect(service.up).toHaveBeenCalled();
    }));
  });
});

class CounterServiceMock {
  up() {}
}
