import { TestBed } from '@angular/core/testing';

import { AssessorService } from './assessor.service';

describe('AssessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessorService = TestBed.get(AssessorService);
    expect(service).toBeTruthy();
  });
});
