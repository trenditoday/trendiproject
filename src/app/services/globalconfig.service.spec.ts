import { TestBed, inject } from '@angular/core/testing';

import { GlobalconfigService } from './globalconfig.service';

describe('GlobalconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalconfigService]
    });
  });

  it('should be created', inject([GlobalconfigService], (service: GlobalconfigService) => {
    expect(service).toBeTruthy();
  }));
});
