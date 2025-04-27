import { Component, computed, inject, signal } from '@angular/core';
import { PrayerTimeService } from '../../servies/prayer-time.service';
import { TranslateModule } from '@ngx-translate/core';
import { PrayerCardComponent } from "../../components/prayer-card/prayer-card.component";
import { CommonModule } from '@angular/common';
import { CountdownTimerComponent } from "../../components/countdown-timer/countdown-timer.component";

@Component({
  selector: 'app-prayer-time',
  imports: [TranslateModule, CommonModule, PrayerCardComponent, CountdownTimerComponent],
  templateUrl: './prayer-time.component.html',
  styleUrl: './prayer-time.component.scss'
})
export class PrayerTimeComponent {
  paryerTimeService: PrayerTimeService = inject(PrayerTimeService);
  fajr = signal('');
  dhuhr = signal('');
  asr = signal('');
  maghrib = signal('');
  isha = signal('');
  hijriDate = signal('');
  city = signal('');
  country = signal('');
  day = signal('');


  nextPrayName = '';
  nextprayNameTime = '';


  selectedLat = 0;
  selectedLong = 0;
  selectedCity = '';
  selectedCountry = '';

  ngOnInit(): void {

    this.paryerTimeService.getLocationFromIP().subscribe(loc => {
      const detectedCity = loc.city || 'Sohag';
      const detectedCountry = loc.country_name || 'Egypt';
      const detectedLat = loc.latitude;
      const detectedLong = loc.longitude;

      this.selectedLat = detectedLat;
      this.selectedLong = detectedLong;
      this.selectedCity = detectedCity;
      this.selectedCountry = detectedCountry;

      this.loadPrayerTimes(detectedCity, detectedCountry);
      this.nextPrayTime(detectedLat, detectedLong,this.isha());
    });
  }

  nextPrayTime(lat: number, long: number , isha:string) {
    this.paryerTimeService.getNextPrayerTime(lat, long , isha).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.nextPrayName =res.name;
          this.nextprayNameTime = res.time;

        },
        error: (err) => console.error('API Error:', err)


      }
    )
  }

  loadPrayerTimes(city: string, country: string): void {
    this.city.set(city);
    this.country.set(country);

    this.paryerTimeService.getPrayerTimings(city, country).subscribe({
      next: (res) => {
        // console.log(res);

        const data = res.data.timings;
        const date = res.data.date.hijri.date;
        const day = res.data.date.gregorian.weekday.en;
        // console.log(day);
        this.day.set(day);

        this.hijriDate.set(date);

        this.fajr.set(data.Fajr);
        this.dhuhr.set(data.Dhuhr);
        this.asr.set(data.Asr);
        this.maghrib.set(data.Maghrib);
        this.isha.set(data.Isha);
      },
      error: (err) => console.error('API Error:', err)
    });
  }



  get prayerTime() {
    return [
      {
        title: 'fajr',
        description: this.fajr(),
        src: 'img/nightlight.jpg',
        alt: 'fajr',
        next: false,
      },
      {
        title: 'dhuhr',
        description: this.dhuhr(),
        src: 'img/daylight.jpg',
        alt: 'dhuhr',
        next: false,
      },
      {
        title: 'asr',
        description: this.asr(),
        src: 'img/daylight.jpg',
        alt: 'asr',
        next: false,
      },
      {
        title: 'maghrib',
        description: this.maghrib(),
        src: 'img/daylight.jpg',
        alt: 'maghrib',
        next: true,
      },
      {
        title: 'isha',
        description: this.isha(),
        src: 'img/nightlight.jpg',
        alt: 'isha',
        next: false,
      }
    ];
  }


}
