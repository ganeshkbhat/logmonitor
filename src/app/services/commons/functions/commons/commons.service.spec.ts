import { TestBed, inject } from '@angular/core/testing';

import { CommonsService } from './commons.service';

describe('CommonsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonsService]
    });
  });

  it('should be created', inject([CommonsService], (service: CommonsService) => {
    expect(service).toBeTruthy();
  }));
});
