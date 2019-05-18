import { TestBed } from '@angular/core/testing';

import { SoccerApiService } from './soccer-api.service';

describe('SoccerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoccerApiService = TestBed.get(SoccerApiService);
    expect(service).toBeTruthy();
  });
});
