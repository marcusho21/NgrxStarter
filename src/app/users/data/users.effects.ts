import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, of, switchMap, tap } from 'rxjs';
import { usersActions } from './users.actions';
import { UsersService } from './users.service';

export const load$ = createEffect(
  (actions = inject(Actions), usersService = inject(UsersService)) =>
    actions.pipe(
      ofType(usersActions.load),
      delay(1000), // Simulate network latency to demo loading state
      switchMap(() =>
        usersService.getAllUsers().pipe(
          map((users) => usersActions.loaded({ users })),
          catchError((error) => {
            console.error(error);
            // jsonplaceholder doesn't produce end user readable error messages so using hard-coded error message for simplicity
            return of(usersActions.error({ message: 'Load users failed' }));
          })
        )
      )
    ),
  { functional: true }
);

export const update$ = createEffect(
  (actions = inject(Actions), usersService = inject(UsersService)) =>
    actions.pipe(
      ofType(usersActions.update),
      switchMap(({ user }) =>
        usersService.updateUser(user).pipe(
          map((user) =>
            usersActions.updated({ user, message: 'User updated' })
          ),
          catchError((error) => {
            console.error(error);
            // jsonplaceholder doesn't produce end user readable error messages so using hard-coded error message for simplicity
            return of(usersActions.error({ message: 'Update user failed' }));
          })
        )
      )
    ),
  { functional: true }
);

export const updateAll$ = createEffect(
  (actions = inject(Actions), usersServive = inject(UsersService)) =>
    actions.pipe(
      ofType(usersActions.updateAll),
      switchMap(({ users }) => {
        const updatedUseres = Object.values(users);
        console.log(updatedUseres);
        return usersServive
          .updateAllUser(updatedUseres)
          .pipe(
            map((users) =>
              usersActions.updatedAll({
                users,
                message: 'All users have been updated',
              })
            )
          );
      }),
      catchError((error) => {
        console.error(error);
        return of(usersActions.error({ message: 'Update failed' }));
      })
    ),
  { functional: true }
);
