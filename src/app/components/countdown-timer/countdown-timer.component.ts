import { CommonModule } from '@angular/common';
import { Component, Input, input, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-countdown-timer',
  imports: [CommonModule,TranslateModule],
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss'
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  private _targetTime = signal<string | null>(null);
  pray = input<string> (); 
  
  @Input()
  set targetTime(value: string | null) {
    this._targetTime.set(value);
  }

  get targetTime() {
    return this._targetTime();
  }

  hours = signal<number>(0);
  minutes = signal<number>(0);
  seconds = signal<number>(0);

  private intervalId: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.updateTimeLeft();
    }, 1000);
  }

  updateTimeLeft() {
    if (!this.targetTime) return;

    const now = new Date();
    const [h, m] = this.targetTime.split(':').map(Number);

    const target = new Date();
    target.setHours(h, m, 0, 0);

    let diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      this.hours.set(0);
      this.minutes.set(0);
      this.seconds.set(0);
      clearInterval(this.intervalId);
      return;
    }

    this.seconds.set(Math.floor(diff / 1000) % 60);
    this.minutes.set(Math.floor(diff / 1000 / 60) % 60);
    this.hours.set(Math.floor(diff / 1000 / 60 / 60));
  }
}
