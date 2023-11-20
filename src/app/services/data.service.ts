import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  fetchCount() {
    const count = localStorage.getItem('count');
    return count && Number.isInteger(+count) ? +count : 0;
  }

  storeCount(count: number) {
    localStorage.setItem('count', count.toString());
  }
}
