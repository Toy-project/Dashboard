import { TestBed, inject } from '@angular/core/testing';

import { AdminVisitService } from './admin-visit.service';

describe('AdminVisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminVisitService]
    });
  });

  it('should be created', inject([AdminVisitService], (service: AdminVisitService) => {
    expect(service).toBeTruthy();
  }));
});
