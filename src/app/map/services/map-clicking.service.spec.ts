import { TestBed } from '@angular/core/testing';

import { MapClickingService } from './map-clicking.service';

describe('MapClickingService', () => {
  let service: MapClickingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapClickingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
