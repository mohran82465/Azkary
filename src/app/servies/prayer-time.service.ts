import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimeService {

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  getToday() {
    const today = new Date();
    return this.datePipe.transform(today, 'dd-MM-yyyy');
  }

  getLocationFromIP(): Observable<any> {
    return this.http.get('https://ipapi.co/json/');
  }

  getTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getPrayerTimings(city: string, country: string): Observable<any> {
    const date = this.getToday();
    const zone = this.getTimeZone();
    const address = `${city}, ${country}`;

    const url = `https://api.aladhan.com/v1/timingsByAddress/${date}?address=${address}&method=3&shafaq=general&tune=5,3,5,7,9,-1,0,8,-6&timezonestring=${zone}&calendarMethod=UAQ`;

    return this.http.get(url);
  }
  getNextPrayerTime(latitude: number, longitude: number, isha: string): Observable<any> {
    const now = new Date();
    const [ishaHours, ishaMinutes] = isha.split(':').map(Number);
  
    const ishaTime = new Date(now);
    ishaTime.setHours(ishaHours, ishaMinutes, 0, 0);
  
    let date: string;
  
    if (now > ishaTime) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      date = this.datePipe.transform(tomorrow, 'dd-MM-yyyy')!;
    } else {
      date = this.getToday()!;
    }
  
    const timeZone = this.getTimeZone();
  
    const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=3&shafaq=general&tune=5,3,5,7,9,-1,0,8,-6&timezonestring=${timeZone}&calendarMethod=UAQ`;
  
    return this.http.get(url).pipe(
      map((response: any) => {
        const timings = response.data.timings;
        const prayers = {
          Fajr: timings.Fajr,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha
        };
  
        const now = new Date();
        for (const [name, time] of Object.entries(prayers)) {
          const [hours, minutes] = time.split(':').map(Number);
          const prayerTime = new Date();
          prayerTime.setHours(hours, minutes, 0, 0);
  
          if (now < prayerTime) {
            return { name, time };
          }
        }
  
        return { name: 'Fajr', time: prayers.Fajr };
      })
    );
  }
  

}
