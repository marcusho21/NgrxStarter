import { MockBuilder, MockRender } from 'ng-mocks';
import { EditableCellComponent } from './editable-cell.component';
import { FormControl } from '@angular/forms';

describe('EditableCellComponent', () => {
  beforeEach(() => MockBuilder(EditableCellComponent));

  it('should create', () => {
    const fixture = MockRender(
      `
        <td editable-cell
            [isEditing]="isEditing"
            [formId]="formId"
            [control]="control"
            [name]="name"
            [value]="value">
      `,
      {
        isEditing: false,
        formId: 'test',
        control: new FormControl(),
        name: 'test',
        value: 'test',
      }
    );
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
