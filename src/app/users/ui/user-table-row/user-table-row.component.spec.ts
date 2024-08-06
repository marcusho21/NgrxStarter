import { MockBuilder, MockRender } from 'ng-mocks';
import { UserTableRowComponent } from './user-table-row.component';

describe('UserTableRowComponent', () => {
  beforeEach(() => MockBuilder(UserTableRowComponent));

  it('should create', () => {
    const fixture = MockRender(
      `
        <tr
          app-user-table-row
          [user]="user"
          (editing)="onEditing($event)"
          (saveUser)="onSaveUser($event)"
        ></tr>
      `,
      {
        user: {
          id: 1,
          name: 'Test',
          username: 'test',
          email: 'test@test.com',
        },
      }
    );
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
