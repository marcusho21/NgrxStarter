import {} from '@angular/common/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { EscapeDirective } from './escape.directive';

describe('EscapeDirective', () => {
  beforeEach(() => MockBuilder(EscapeDirective));

  it('should create an instance', () => {
    MockRender(
      `
      <div (escape)="onEscape()"></div>
    `,
      { onEscape: () => {} }
    );
    const directive = ngMocks.findInstance(EscapeDirective);
    expect(directive).toBeTruthy();
  });

  it('should dispatch escape event when document emit keydown.escape event', () => {
    const spy = jasmine.createSpy('onEscape');
    MockRender(
      `
        <div (escape)="onEscape()"></div>
      `,
      { onEscape: spy }
    );
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(spy).toHaveBeenCalled();
  });
});
