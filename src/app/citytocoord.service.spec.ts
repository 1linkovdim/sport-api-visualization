import { TestBed } from '@angular/core/testing';

import { CitytocoordService } from './citytocoord.service';

describe('CitytocoordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitytocoordService = TestBed.get(CitytocoordService);
    expect(service).toBeTruthy();
  });
});
