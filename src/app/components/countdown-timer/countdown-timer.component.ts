import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, signal, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss'
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  private _targetTime = signal<string | null>(null);
  pray = input<string>();

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
    const [targetHour, targetMinute] = this.targetTime.split(':').map(Number);

    const target = new Date();
    target.setHours(targetHour, targetMinute, 0, 0);

    let diffMs = target.getTime() - now.getTime();

    // If target time already passed today, assume it's for tomorrow
    if (diffMs < 0) {
      target.setDate(target.getDate() + 1);
      diffMs = target.getTime() - now.getTime();
    }

    const totalSeconds = Math.floor(diffMs / 1000);

    // Using modulo to get clean hours, minutes, seconds
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;

    this.hours.set(hours);
    this.minutes.set(minutes);
    this.seconds.set(seconds);
  }
}
