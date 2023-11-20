import { Component, DebugElement } from '@angular/core';
import { BackgroundChangerDirective } from './background-changer.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { rgba2hex } from '../common/utils';

@Component({
  selector: 'test-host',
  template: `<div [backgroundChanger]="count"></div>`,
})
class TestComponent {
  count = 0;
}

describe('BackgroundChangerDirective', () => {
  let host: TestComponent,
    fixture: ComponentFixture<TestComponent>,
    directive: DebugElement,
    body: HTMLBodyElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BackgroundChangerDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    host = fixture.componentInstance;
    directive = fixture.debugElement.queryAll(
      By.directive(BackgroundChangerDirective)
    )[0];
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('when count is 10', () => {
    beforeEach(() => {
      host.count = 10;
      fixture.detectChanges();
      body = document.querySelector('body')!;
    });
    it('should change background color to "#e74c3c"', () => {
      expect(rgba2hex(body.style.backgroundColor)).toEqual('#e74c3c');
    });
    it('should not change background color to "#27ae60"', () => {
      expect(rgba2hex(body.style.backgroundColor)).not.toEqual('#27ae60');
    });
  });

  describe('when count is -10', () => {
    beforeEach(() => {
      host.count = -10;
      fixture.detectChanges();
      body = document.querySelector('body')!;
    });
    it('should change background color to "#27ae60"', () => {
      expect(rgba2hex(body.style.backgroundColor)).toEqual('#27ae60');
    });
    it('should not change background color to "#e74c3c"', () => {
      expect(rgba2hex(body.style.backgroundColor)).not.toEqual('#e74c3c');
    });
  });
});
