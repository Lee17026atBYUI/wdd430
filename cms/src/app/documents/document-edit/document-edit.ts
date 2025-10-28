import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css'
})
export class DocumentEdit implements OnInit, OnDestroy {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  private subscription: Subscription;
  private id: string;

  private documentService = inject(DocumentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(null, value.name, value.description, value.url, null);

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.onCancel();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        // check if we even got an id (we won't for new document mode)
        if (this.id == null) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(this.id);

        // check if they passed in a fake id
        if (this.originalDocument == null) return;

        this.editMode = true;
        // copying objects with the spread operator ... is a deep copy at the first level but a shallow copy for nested objects
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    );
    
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      if (this.id == null) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(this.id);
      if (this.originalDocument == null) return;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
