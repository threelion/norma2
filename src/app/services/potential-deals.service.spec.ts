import { TestBed, inject } from '@angular/core/testing';

import { PotentialDealsService } from './potential-deals.service';

describe('PotentialDealsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PotentialDealsService]
    });
  });

  it('should be created', inject([PotentialDealsService], (service: PotentialDealsService) => {
    expect(service).toBeTruthy();
  }));
});
