import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  count = 0;
  step = 1;
  actionCounter = 0;
  countSubject = new Subject<number>();
  constructor(private dataService: DataService) {}

  up() {
    this.handleActionCounter();
    this.handleStep();
    this.count += this.step;
    this.countSubject.next(this.count);
    this.dataService.storeCount(this.count);
  }

  down() {
    this.handleActionCounter();
    this.handleStep();
    this.count -= this.step;
    this.countSubject.next(this.count);
    this.dataService.storeCount(this.count);
  }

  loadCount() {
    this.count = this.dataService.fetchCount();
    this.countSubject.next(this.count);
  }

  handleStep() {
    if (this.actionCounter % 30 === 0) this.step = this.step * 2;
  }

  handleActionCounter() {
    this.actionCounter++;
  }

  resetCount() {
    this.count = 0;
    this.countSubject.next(this.count);
    this.dataService.storeCount(this.count);
  }
}
