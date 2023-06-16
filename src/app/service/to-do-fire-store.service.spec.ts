import { TestBed } from '@angular/core/testing';

import { ToDoFireStoreService } from './to-do-fire-store.service';

describe('ToDoFireStoreService', () => {
  let service: ToDoFireStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoFireStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
