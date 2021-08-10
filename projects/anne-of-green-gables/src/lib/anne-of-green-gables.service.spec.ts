import { TestBed } from '@angular/core/testing';

import { AnneOfGreenGablesService } from './anne-of-green-gables.service';

describe('MyLibSecondService', () => {
  let service: AnneOfGreenGablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneOfGreenGablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
