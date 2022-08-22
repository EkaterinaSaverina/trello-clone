import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'router';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
    data: any;
}

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route: ActivatedRouteSnapshot = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params, data } = route;

        return { url, queryParams, params, data };
    }
}
