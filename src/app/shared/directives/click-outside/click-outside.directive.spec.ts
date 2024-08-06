import { MockBuilder, MockRender } from 'ng-mocks';
import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  beforeEach(() => MockBuilder(ClickOutsideDirective));

  it('should create an instance', () => {
    const fixture = MockRender(ClickOutsideDirective);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
