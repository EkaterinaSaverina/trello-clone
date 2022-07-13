import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SpinnerService } from './core/services';
import { AppState } from './core/store/app.state';
import { initApp, selectAuthenticatedUser } from './core/store/auth';
import { User } from './core/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'trello-clone';
    showSpinner$: Observable<boolean>;
    user$!: Observable<User | undefined>;

    constructor(
        private spinner: SpinnerService,
        private store$: Store<AppState>
    ) {
        this.showSpinner$ = spinner.getValue();
        this.store$.dispatch(initApp());
        this.user$ = this.store$.pipe(select(selectAuthenticatedUser));
    }
}
