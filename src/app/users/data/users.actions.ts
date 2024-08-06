import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user';
import { Update } from '@ngrx/entity';

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    load: emptyProps(),
    loaded: props<{ users: User[] }>(),
    update: props<{ user: User }>(),
    updated: props<{ user: User; message: string }>(),
    updateAll: props<{ users: User[] }>(),
    updatedAll: props<{ users: User[]; message: string }>(),
    error: props<{ message: string }>(),
    clearStatusMessage: emptyProps(),
  },
});
