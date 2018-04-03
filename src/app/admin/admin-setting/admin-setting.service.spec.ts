import { TestBed, inject } from '@angular/core/testing';

import { AdminSettingService } from './admin-setting.service';

describe('AdminSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminSettingService]
    });
  });

  it('should be created', inject([AdminSettingService], (service: AdminSettingService) => {
    expect(service).toBeTruthy();
  }));
});
