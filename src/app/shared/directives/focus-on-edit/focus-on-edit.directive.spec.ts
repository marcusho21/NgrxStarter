import { fakeAsync } from '@angular/core/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { FocusOnEditDirective } from './focus-on-edit.directive';

describe('FocusOnEditDirective', () => {
  beforeEach(() => MockBuilder(FocusOnEditDirective));

  it('should create an instance', () => {
    const directive = MockRender(`<input [focusOnEdit]="isEditing" />`, {
      isEditing: false,
    });
    expect(directive.point.componentInstance).toBeTruthy();
  });

  it('should focus host element on edit state change', fakeAsync(() => {
    const fixture = MockRender(`<input [focusOnEdit]="isEditing" />`, {
      isEditing: false,
    });
    const spy = spyOn(ngMocks.find('input').nativeElement, 'focus');

    fixture.componentInstance.isEditing = true;
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));
});
