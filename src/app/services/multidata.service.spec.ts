import { TestBed, inject } from '@angular/core/testing';

import { MultidataService } from './multidata.service';

describe('MultidataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultidataService]
    });
  });

  it('should be created', inject([MultidataService], (service: MultidataService) => {
    expect(service).toBeTruthy();
  }));
});
