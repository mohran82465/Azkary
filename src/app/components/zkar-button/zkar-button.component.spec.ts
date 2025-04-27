import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZkarButtonComponent } from './zkar-button.component';

describe('ZkarButtonComponent', () => {
  let component: ZkarButtonComponent;
  let fixture: ComponentFixture<ZkarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZkarButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZkarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
