import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services';
// import { AuthService, NotificationsService } from '../core/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    isLogin = true;
    formGroup!: FormGroup;
    errorToShow!: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        // private notificationsService: NotificationsService,
    ) { }

    async submitForm(): Promise<void> {
        try {
            if (this.isLogin) {
                await this.login();
            } else {
                await this.register();
            }
            this.router.navigate(['']);
        }
        catch (error: any) {
            this.errorToShow = error.message;
            // this.notificationsService.openSnackBar(this.errorToShow, 'close');
        }
    }

    changeForm(isLogin: boolean): void {
        this.isLogin = isLogin;
        this.initializeForm();
    }

    isFieldEmpty(field: string): boolean | undefined {
        return this.formGroup.get(field)?.hasError('required');
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.formGroup = new FormGroup({
            email: new FormControl('', { validators: [Validators.email, Validators.required] }),
            password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
        }, { updateOn: 'blur' });

        if (!this.isLogin) {
            this.formGroup.addControl('name', new FormControl('', { validators: [Validators.required] }));
            this.formGroup.addControl('surname', new FormControl('', { validators: [Validators.required] }));
        }
    }

    private async login(): Promise<void> {
        const { email, password } = this.formGroup.value;
        await this.authService.login(email, password);
    }

    private async register(): Promise<void> {
        const { email, password } = this.formGroup.value;
        await this.authService.register(email, password);
    }
}
