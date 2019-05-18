import { TestBed } from '@angular/core/testing';

import { NhlapiService } from './nhlapi.service';

describe('NhlapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhlapiService = TestBed.get(NhlapiService);
    expect(service).toBeTruthy();
  });
});
