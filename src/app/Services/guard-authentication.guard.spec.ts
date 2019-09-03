import { TestBed, async, inject } from '@angular/core/testing';

import { GuardAuthenticationGuard } from './guard-authentication.guard';

describe('GuardAuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardAuthenticationGuard]
    });
  });

  it('should ...', inject([GuardAuthenticationGuard], (guard: GuardAuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
