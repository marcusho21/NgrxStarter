import { createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../models/user';
import { usersActions } from './users.actions';

type UsersActionState =
  | { type: 'init' } // This is the initial state, use before any action is dispatched
  | { type: 'loading' } // loading state, use when loading users
  | { type: 'updating' } // updating state, use when updating a user
  | { type: 'success' } // success state, use on action success without message
  | { type: 'success'; message: string } // success state, use action is successful with message
  | { type: 'error'; message: string }; // error state, use when action fails

export const adapter = createEntityAdapter<User>();

export const initialState = adapter.getInitialState<{
  actionState: UsersActionState;
}>({
  actionState: { type: 'init' },
});

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(usersActions.load, (state) => ({
      ...state,
      actionState: { type: 'loading' } as const,
    })),
    on(usersActions.loaded, (state, { users }) =>
      adapter.setAll(users, {
        ...state,
        actionState: { type: 'success' } as const,
      })
    ),
    on(usersActions.update, (state) => ({
      ...state,
      actionState: { type: 'updating' } as const,
    })),
    on(usersActions.updated, (state, { user, message }) =>
      adapter.setOne(user, {
        ...state,
        actionState: { type: 'success', message } as const,
      })
    ),
    on(usersActions.error, (state, { message }) => ({
      ...state,
      actionState: { type: 'error', message } as const,
    })),
    on(usersActions.clearStatusMessage, (state) => ({
      ...state,
      actionState: { type: 'success' } as const,
    }))
  ),
  extraSelectors: ({ selectUsersState, selectActionState }) => ({
    ...adapter.getSelectors(selectUsersState),
    selectMessage: createSelector(selectActionState, (state) =>
      'message' in state ? { status: state.type, message: state.message } : null
    ),
    selectLoading: createSelector(
      selectActionState,
      (state) => state.type === 'loading'
    ),
  }),
});

export const {
  name: usersFeatureKey,
  reducer: usersReducer,
  selectAll: selectAllUsers,
  selectMessage: selectUsersStatusMessage,
  selectLoading: selectUsersLoading,
} = usersFeature;
