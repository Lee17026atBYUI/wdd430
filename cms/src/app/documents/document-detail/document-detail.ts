import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css'
})
export class DocumentDetail implements OnInit, OnDestroy {
  document: Document = null;
  nativeWindow: any;
  private documentService = inject(DocumentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private windRefService = inject(WindRefService);
  private subscription: Subscription;
  private id: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );

    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.document = this.documentService.getDocument(this.id);
    });

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['documents']);
  }

}
