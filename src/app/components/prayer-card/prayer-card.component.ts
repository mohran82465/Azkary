import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-prayer-card',
  imports: [CommonModule,TranslateModule],
  templateUrl: './prayer-card.component.html',
  styleUrl: './prayer-card.component.scss'
})
export class PrayerCardComponent {
  destination = input<{
    title: string;
    description: string;
    src: string;
    alt: string;
  }>();

  isWide = input<boolean>();
  // time = this.convertTo12Hour(this.destination()!.description);

  
 

  convertTo12Hour(time24: string): string {
    const [hourStr, minuteStr] = time24.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
  }
  
 
}
