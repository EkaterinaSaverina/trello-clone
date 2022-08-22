import firebase from 'firebase/compat/app';

import { Document } from './document';

export class User extends Document {
    username: string;

    constructor(authUser: firebase.User) {
        super();
        this.username = authUser.displayName || '';
    }
}
