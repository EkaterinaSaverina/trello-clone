export class Document {
    id!: string;
}

export class DocumentInfo<T> {
    id: string;
    exists: boolean;
    data: T;

    constructor(snapshot: any) {
        this.id = snapshot.id;
        this.exists = snapshot.exists;
        this.data = snapshot.data();
    }
}
