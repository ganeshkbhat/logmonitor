import { TestBed, inject } from '@angular/core/testing';

import { StaticSocketsService } from './static.sockets.service';

describe('StaticSocketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticSocketsService]
    });
  });

  it('should be created', inject([StaticSocketsService], (service: StaticSocketsService) => {
    expect(service).toBeTruthy();
  }));
});
