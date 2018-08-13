import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoffQuoteComponent } from './payoff-quote.component';

describe('PayoffQuoteComponent', () => {
  let component: PayoffQuoteComponent;
  let fixture: ComponentFixture<PayoffQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoffQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoffQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
