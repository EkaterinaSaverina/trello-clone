import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, routerReducer, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { ROUTER_FEATURE_KEY, CustomSerializer } from './core/store/router';
import { authReducer, AUTH_FEATURE_KEY } from './core/store/auth/auth.reducer';
import { AuthModule } from './core/store/auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        AuthModule,
        StoreModule.forRoot({
            [ROUTER_FEATURE_KEY]: routerReducer,
            [AUTH_FEATURE_KEY]: authReducer,
        },
            {}),
        StoreRouterConnectingModule.forRoot({
            serializer: CustomSerializer,
            navigationActionTiming: NavigationActionTiming.PostActivation,
            routerState: RouterState.Minimal,
        }),
        EffectsModule.forRoot([]),
        SharedModule,
    ],
    providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
