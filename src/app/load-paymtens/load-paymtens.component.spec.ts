import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPaymtensComponent } from './load-paymtens.component';

describe('LoadPaymtensComponent', () => {
  let component: LoadPaymtensComponent;
  let fixture: ComponentFixture<LoadPaymtensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadPaymtensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadPaymtensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
