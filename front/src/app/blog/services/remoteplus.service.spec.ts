import { TestBed } from '@angular/core/testing';

import { RemoteplusService } from './remoteplus.service';

describe('RemoteplusService', () => {
  let service: RemoteplusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteplusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
