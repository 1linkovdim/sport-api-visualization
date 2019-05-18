import { TestBed } from '@angular/core/testing';

import { NbaApiService } from './nba-api.service';

describe('NbaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NbaApiService = TestBed.get(NbaApiService);
    expect(service).toBeTruthy();
  });
});
