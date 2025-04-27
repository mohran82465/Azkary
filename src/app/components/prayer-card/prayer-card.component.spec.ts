import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerCardComponent } from './prayer-card.component';

describe('PrayerCardComponent', () => {
  let component: PrayerCardComponent;
  let fixture: ComponentFixture<PrayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
