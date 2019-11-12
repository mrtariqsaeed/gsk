import { TestBed } from '@angular/core/testing';

import { AssessorsService } from './assessors.service';

describe('AssessorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessorsService = TestBed.get(AssessorsService);
    expect(service).toBeTruthy();
  });
});
