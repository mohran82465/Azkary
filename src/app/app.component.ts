import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [ TranslateModule,RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'azkry';
  currentLanguage: string = 'ar'; // default

  translate:TranslateService = inject(TranslateService); 

  toggleLanguage() {
  if (this.currentLanguage === 'en') {
    this.currentLanguage = 'ar';
    this.translate.use('ar');
  } else {
    this.currentLanguage = 'en';
    this.translate.use('en');
  }
}
  translateText(lang:string){
    this.translate.use(lang )
  }
}
