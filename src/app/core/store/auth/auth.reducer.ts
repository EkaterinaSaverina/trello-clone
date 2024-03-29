import { Action, createReducer, on } from '@ngrx/store';

import { login, updateUser, logout, logoutSuccess } from './auth.actions';
import { User } from '@app/core/models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthenticatedUserState {
    user?: User;
}

const initialState: AuthenticatedUserState = {
    user: undefined,
};

const actionReducer = createReducer(
    initialState,
    on(login, (state) => ({ ...state })),
    on(updateUser, (state, { user }) => ({
        ...state,
        user,
    })),
    on(logout, (state) => ({ ...state })),
    on(logoutSuccess, () => initialState)
);

export const authReducer = (state: any, action: Action) => {
    return actionReducer(state, action);
};
