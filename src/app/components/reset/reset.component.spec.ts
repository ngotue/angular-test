import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ResetComponent } from './reset.component';
import { CounterService } from '../../services/counter.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let counterService: CounterService;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2023-11-19'));
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [ResetComponent],
      providers: [{ provide: CounterService, useClass: CounterServiceMock }],
    });
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    counterService = TestBed.inject(CounterService);
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user enter the date of birth and submit', () => {
    describe('when user is less than 18 years old', () => {
      beforeEach(() => {
        component.birthdayForm.setValue({
          birthday: '2006-02-18',
        });
        fixture.detectChanges();
        spyOn(counterService, 'resetCount');
        const submitButton =
          fixture.debugElement.nativeElement.querySelector('button');
        submitButton.click();
      });
      it("should not call countService's reset function", () => {
        expect(counterService.resetCount).not.toHaveBeenCalled();
      });
      it('should show under 18 warning', () => {
        fixture.detectChanges();
        const warning =
          fixture.debugElement.nativeElement.querySelector('[data-test="warning"]');
        expect(warning).toBeTruthy();
      });
      it('should reset input', () => {
        expect(component.birthdayForm.get('birthday')?.value).toEqual(null);
      });
    });
    describe('when user is at least 18 years old', () => {
      beforeEach(() => {
        component.birthdayForm.setValue({
          birthday: '2005-12-18',
        });
        fixture.detectChanges();
        spyOn(counterService, 'resetCount');
        const submitButton =
          fixture.debugElement.nativeElement.querySelector('button');
        submitButton.click();
      });
      it("should call countService's reset function", () => {
        expect(counterService.resetCount).toHaveBeenCalled();
      });
      it('should not show under 18 warning', () => {
        fixture.detectChanges();
        const warning = fixture.debugElement.nativeElement.querySelector(
          '[data-test="warning"]'
        );
        expect(warning).not.toBeTruthy();
      });
      it('should reset input', () => {
        expect(component.birthdayForm.get('birthday')?.value).toEqual(null);
      });
    });
  });
});

class CounterServiceMock {
  resetCount() {}
}
