import { TestBed } from '@angular/core/testing';

import { Shops } from './shops';

describe('Shops', () => {
  let service: Shops;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shops);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
