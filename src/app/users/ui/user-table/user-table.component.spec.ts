import { MockBuilder, MockRender } from 'ng-mocks';
import { UserTableComponent } from './user-table.component';
import { Store } from '@ngrx/store';
import { UsersFacade } from '../../data/users.facade';
import { of } from 'rxjs';

describe('UserTableComponent', () => {
  beforeEach(() =>
    MockBuilder(UserTableComponent).mock(UsersFacade, {
      users$: of([]),
      statusMessage$: of(null),
      isLoading$: of(false),
    })
  );

  it('should create', () => {
    const fixture = MockRender(UserTableComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
