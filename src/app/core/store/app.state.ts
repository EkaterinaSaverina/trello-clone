import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from './router/router.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    authenticatedUser: fromAuth.AuthenticatedUserState;
}

export const initialState = {
    router: {},
    authenticatedUser: {},
};
