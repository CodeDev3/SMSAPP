import { TestBed } from '@angular/core/testing';

import { GetAPIDataService } from './get-apidata.service';

describe('GetAPIDataService', () => {
  let service: GetAPIDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAPIDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
