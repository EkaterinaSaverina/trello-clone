import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { from } from 'rxjs';
import { map, switchMap, exhaustMap } from 'rxjs/operators';

import { AuthService } from '@app/core/service';
import { Route } from '@app/core/models';

import * as fromAuthActions from './auth.actions';
import { User } from '../../models';

@Injectable()
export class AuthEffects {
    initApp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.initApp),
            switchMap(() =>
                from(this.authService.initAuth()).pipe(
                    switchMap(() => this.authService.user$),
                    map((user) => fromAuthActions.updateUser({ user: user as User }))
                )
            )
        )
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.login),
            switchMap(() =>
                from(this.authService.login()).pipe(
                    switchMap(() => {
                        this.router.navigate([Route.default]);

                        return this.authService.user$;
                    }),
                    map((user) => fromAuthActions.updateUser({ user: user as User }))
                )
            )
        )
    );

    signOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.logout),
            exhaustMap(() => from(this.authService.logout())),
            exhaustMap(() => from(this.router.navigate([Route.login]))),
            map(() => fromAuthActions.logoutSuccess())
        )
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }
}
