import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZkarCardComponent } from './zkar-card.component';

describe('ZkarCardComponent', () => {
  let component: ZkarCardComponent;
  let fixture: ComponentFixture<ZkarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZkarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZkarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
