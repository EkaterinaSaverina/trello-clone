import { createAction, props } from '@ngrx/store';

import { User } from '@app/core/models';

export const initApp = createAction('[Auth] Init');

export const login = createAction('[Auth] Login');

export const updateUser = createAction('[Auth] Fetch User Success', props<{ user: User }>());

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');
