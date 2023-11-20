import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent {
  birthdayForm = new FormGroup({
    birthday: new FormControl('', [Validators.required]),
  });

  isTooYoung = false;

  constructor(private counterService: CounterService) {}

  onSubmit() {
    const birthDateYear = new Date(
      this.birthdayForm.get('birthday')?.value!
    ).getFullYear();
    const age = new Date().getFullYear() - birthDateYear;
    if (age < 18) this.isTooYoung = true;
    else {
      this.isTooYoung = false;
      this.counterService.resetCount();
    }
    this.birthdayForm.reset();
  }
}
