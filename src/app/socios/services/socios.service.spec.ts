import { TestBed, inject } from '@angular/core/testing';

import { SociosService } from './socios.service';

describe('SociosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SociosService]
    });
  });

  it('should be created', inject([SociosService], (service: SociosService) => {
    expect(service).toBeTruthy();
  }));
});
