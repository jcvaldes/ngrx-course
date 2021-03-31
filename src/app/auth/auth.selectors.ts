import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers/index';

// export const isLoggedIn = createSelector(
//   state => state['auth'],
//   state => state['courses']
// );

export const selectAuthState = createFeatureSelector<AuthState>('auth');

// export const isLoggedIn = createSelector(
//   state => state['auth'],
//   (auth) => !!auth.user
// );

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);
export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);

