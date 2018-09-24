import { TestBed, inject } from '@angular/core/testing';

import { PotentialPositionService } from './potential-position.service';

describe('PotentialPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PotentialPositionService]
    });
  });

  it('should be created', inject([PotentialPositionService], (service: PotentialPositionService) => {
    expect(service).toBeTruthy();
  }));
});
