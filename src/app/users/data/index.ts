import { provideEffects } from '@ngrx/effects';
import * as usersEffects from './users.effects';
import { provideState } from '@ngrx/store';
import { usersFeature } from './users.reducer';

export const provideUsers = () => [
  provideState(usersFeature),
  provideEffects(usersEffects),
];
