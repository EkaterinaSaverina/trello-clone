import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, filter, map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

import firebase from 'firebase/compat/app';

import { DocumentInfo, User } from '../models';
import { AuthSubscriptionService, DatabaseService } from '.';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userSubject$ = new BehaviorSubject<User>({} as User);
    private logOutSubject$ = new Subject<void>();
    // private unsubscribe!: firebase.Unsubscribe;

    constructor(
        private db: DatabaseService,
        private authSubscriptionService: AuthSubscriptionService
    ) { }

    get user$(): Observable<User> {
        return this.userSubject$.asObservable().pipe(distinctUntilChanged());
    }

    async initAuth(): Promise<void> {
        this.checkAuthState(true);
    }

    async register(email: string, password: string): Promise<void> {
        await this.db.register(email, password);
    }

    async login(email: string, password: string): Promise<void> {
        await this.db.login(email, password);

        if (!this.authSubscriptionService.unsubscribe$) {
            this.checkAuthState();
        }
    }

    async logout(): Promise<void> {
        await this.db.logout();
        this.logOutSubject$.next();
        this.userSubject$.next({} as User);
    }

    private checkAuthState(emitNull?: boolean): void {
        this.unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
            if (currentUser?.uid) {
                this.initUser(currentUser);
                this.unsubscribe();
                this.unsubscribe = null as any;
            } else if (emitNull) {
                this.userSubject$.next({} as User);
            }
        });
    }

    // private getAuthState() {
    //     return this.afAuth.authState
    //         .pipe(
    //             takeUntil(this.authSubscriptionService.unsubscribe$)
    //         );
    // }

    // private getUser(userId: string): Observable<User> {
    //     return of(this.authUserService.getCurrentUser())
    //         .pipe(
    //             takeUntil(this.authSubscriptionService.unsubscribe$)
    //         );
    // }

    private createUser(authUser: firebase.User): Promise<void> {
        return this.db.setDocument(`users/${authUser.uid}`, new User(authUser) as Record<string, any>);
    }

    private initUser(authUser: firebase.User): void {
        this.db
            .documentInfo<any>(`users/${authUser.uid}`)
            .pipe(
                tap((docInfo) => {
                    if (!docInfo.exists) {
                        this.createUser(authUser);
                    }
                }),
                filter((docInfo) => docInfo.exists),
                map((docInfo) => ({ ...docInfo.data, id: docInfo.id })),
                takeUntil(this.logOutSubject$)
            )
            .subscribe((user: User) => this.userSubject$.next(user));
    }
}
