import { TestBed, inject } from '@angular/core/testing';

import { PayoffService } from './payoff.service';

describe('PayoffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayoffService]
    });
  });

  it('should be created', inject([PayoffService], (service: PayoffService) => {
    expect(service).toBeTruthy();
  }));
});
