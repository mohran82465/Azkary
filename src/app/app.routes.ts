import { Routes } from '@angular/router';
import { PrayerTimeComponent } from './pages/prayer-time/prayer-time.component';
import { AzkarComponent } from './pages/azkar/azkar.component';

export const routes: Routes = [
    {path:'praytime' , component: PrayerTimeComponent}, 
    {path:'azkar', component: AzkarComponent }, 
    { path: '', redirectTo: '/praytime', pathMatch: 'full' },
        { path: '**', redirectTo: '/praytime',  },
    
];
