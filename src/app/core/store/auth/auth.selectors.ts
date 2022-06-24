import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_FEATURE_KEY, AuthenticatedUserState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthenticatedUserState>(AUTH_FEATURE_KEY);

export const selectAuthenticatedUser = createSelector(selectAuthState, (authStateData) => authStateData?.user);

export const selectAuthenticatedUserId = createSelector(
    selectAuthenticatedUser,
    (authenticatedUser) => authenticatedUser?.id
);
