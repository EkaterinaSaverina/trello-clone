import { Injectable } from '@angular/core';
import { Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentInfo } from '../models';
import { collection, CollectionReference } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(
        private firestore: AngularFirestore,
        private firebaseAuth: AngularFireAuth
    ) { }

    async register(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    login(): Promise<firebase.auth.UserCredential> {
        return this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout(): Promise<void> {
        return this.firebaseAuth.signOut();
    }

    documents<T extends Document>(path: string): Observable<T[]> {
        return this.firestore
            .collection<T>(path)
            .snapshotChanges()
            .pipe(map((docs) => this.mapIdsToCollectionDocuments<T>(docs)));
    }

    document<T extends Document>(path: string): Observable<T> {
        return this.firestore
            .doc<T>(path)
            .snapshotChanges()
            .pipe(map((doc) => this.mapIdsToDocument<T>(doc)));
    }

    documentInfo<T extends Document>(path: string): Observable<DocumentInfo<T>> {
        return this.firestore
            .doc<T>(path)
            .snapshotChanges()
            .pipe(map((snapshot) => new DocumentInfo<T>(snapshot.payload)));
    }

    setDocument<T>(path: string, data: T): Promise<void> {
        return this.firestore.doc(path).set(JSON.parse(JSON.stringify(data)));
    }

    private mapIdsToCollectionDocuments<T>(actions: DocumentChangeAction<T>[]): T[] {
        return actions.map((action: DocumentChangeAction<T>) => {
            const data = action.payload.doc.data() as T;
            const id = action.payload.doc.id;

            return {
                ...data,
                id,
            };
        });
    }

    private mapIdsToDocument<T>(action: Action<DocumentSnapshot<T>>): T {
        const data = action.payload.data() as T;
        const id = action.payload.id;

        return {
            ...data,
            id,
        };
    }
}
