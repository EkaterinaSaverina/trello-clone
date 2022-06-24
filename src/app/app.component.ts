import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SpinnerService } from './core/services/spinner.service';
import { AppState } from './core/store/app.state';
import { initApp } from './core/store/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'trello-clone';
    showSpinner$: Observable<boolean>;

    constructor(
        private spinner: SpinnerService,
        private store$: Store<AppState>
    ) {
        this.showSpinner$ = spinner.getValue();
        this.store$.dispatch(initApp());
    }
}
