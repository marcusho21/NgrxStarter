import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('LoaderComponent', () => {
  beforeEach(() => MockBuilder(LoaderComponent));

  it('should create', () => {
    const fixture = MockRender(LoaderComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
