import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from './router.reducer';

export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getRouterState = createSelector(selectRouterState, state => state?.state);

export const selectRouterParams = createSelector(getRouterState, (routerState: RouterStateUrl) => routerState?.params);

export const selectRouterQueryParams = createSelector(
    getRouterState,
    (routerState: RouterStateUrl) => routerState?.queryParams,
);
