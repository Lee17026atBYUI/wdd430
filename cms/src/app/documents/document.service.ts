import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { FirebaseService } from '../shared/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private firebaseService = inject(FirebaseService);
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;

    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.firebaseService.get<Document[]>('documents').subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.listChanged();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  copyDocuments() {
    return this.documents.slice();
  }

  storeDocuments() {
    this.firebaseService.put('documents', this.documents);
    this.listChanged();
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach(document => {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == null) { // this checks for both null and undefined
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument == null || newDocument == null) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }
  
  private listChanged() {
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
