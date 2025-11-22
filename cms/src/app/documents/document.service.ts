import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { FirebaseService } from '../shared/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private firebaseService = inject(FirebaseService);
  private http = inject(HttpClient);
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;

    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    // this.firebaseService.get<Document[]>('documents').subscribe(
    this.firebaseService.get<{documents: Document[]}>('documents').subscribe(
      (res) => {
      // (documents: Document[]) => {
        // console.log(documents);
        // this.documents = documents;
        this.documents = res.documents;
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

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          // this.sortAndSend();
          this.listChanged();
        }
      );


    // this.documents.splice(pos, 1);
    // this.storeDocuments();
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

    newDocument.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        newDocument,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.documents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.listChanged();
      });
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
    newDocument._id = originalDocument._id;
    // this.documents[pos] = newDocument;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/documents/' + originalDocument.id, newDocument, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.documents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.listChanged();
      });


    // this.storeDocuments();
  }
  
  private listChanged() {
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
