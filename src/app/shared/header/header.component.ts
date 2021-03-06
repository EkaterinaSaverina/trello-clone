import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    constructor(
        // private authService: AuthService,
        private router: Router,
    ) { }

    logOut(): void {
        // this.authService.logOut();
        this.router.navigate(['/login']);
    }
}
