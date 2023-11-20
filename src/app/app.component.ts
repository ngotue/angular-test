import { Component, ViewEncapsulation } from '@angular/core';
import { CounterService } from './services/counter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  count: number;
  countSub: Subscription;

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.counterService.loadCount();
    this.count = this.counterService.count;
    this.countSub = this.counterService.countSubject.subscribe((count) => {
      console.log('coount ::', count);
      this.count = count;
    });
  }

  ngOnDestroy() {
    this.countSub?.unsubscribe();
  }
}
