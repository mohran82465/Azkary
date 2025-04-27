import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-zkar-button',
  imports: [],
  templateUrl: './zkar-button.component.html',
  styleUrl: './zkar-button.component.scss'
})
export class ZkarButtonComponent {
  count = input<number>(0); 
  displayCount= input<number>(0); 
  number = input<number>(0); 
  

}
