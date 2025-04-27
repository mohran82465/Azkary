import { Component } from '@angular/core';

@Component({
  selector: 'app-zkar-card',
  imports: [],
  templateUrl: './zkar-card.component.html',
  styleUrl: './zkar-card.component.scss'
})
export class ZkarCardComponent {
  // In your component class
currentCount: number = 10;

decrementCounter() {
  if (this.currentCount > 0) {
    this.currentCount--;
    // Optional: Add haptic feedback here
  }
}
}
