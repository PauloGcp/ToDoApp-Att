import { TestBed } from '@angular/core/testing';

import { toDoService } from './to-do.service';

describe('toDoService', () => {
  let service: toDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(toDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
