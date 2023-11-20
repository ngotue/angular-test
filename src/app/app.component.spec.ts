import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BackgroundChangerDirective } from './directives/background-changer.directive';
import { CounterService } from './services/counter.service';
import { Subject, Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>,
    app: AppComponent,
    service: CounterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, BackgroundChangerDirective, HeaderComponent],
      providers: [{ provide: CounterService, useClass: CounterServiceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = TestBed.inject(CounterService);
    spyOn(service, 'loadCount');
    spyOn(service.countSubject, 'subscribe');
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call loadCount from counterService', () => {
    expect(service.loadCount).toHaveBeenCalled();
  });

  it('should call subscribe from counterService.countSubject', () => {
    expect(service.countSubject.subscribe).toHaveBeenCalled();
  });

  describe('when app destroy', () => {
    it('should call unsubscribe on count subscription', () => {
      app.countSub = new Subscription();
      spyOn(app.countSub, 'unsubscribe');
      app.ngOnDestroy();
      expect(app.countSub.unsubscribe).toHaveBeenCalled();
    });
  });
});

class CounterServiceMock {
  loadCount() {}
  countSubject = new Subject<number>();
}
