import { TestBed } from '@angular/core/testing';

import { TypesService } from './types.service';

describe('TypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypesService = TestBed.get(TypesService);
    expect(service).toBeTruthy();
  });
});
