import { Component } from '@angular/core';
import { ZkarButtonComponent } from "../../components/zkar-button/zkar-button.component";
import { ZkarCardComponent } from "../../components/zkar-card/zkar-card.component";

@Component({
  selector: 'app-azkar',
  imports: [ZkarButtonComponent, ZkarCardComponent],
  templateUrl: './azkar.component.html',
  styleUrl: './azkar.component.scss'
})
export class AzkarComponent {

}
