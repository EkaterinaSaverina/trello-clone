import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthSubscriptionService {
    unsubscribeComponent$ = new Subject<void>();
    unsubscribe$ = this.unsubscribeComponent$.asObservable();
}
