import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css'
})
export class DocumentDetail {
  document: Document;
  nativeWindow: any;
  private documentService = inject(DocumentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private windRefService = inject(WindRefService);

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id: string = params['id'];
        this.document = this.documentService.getDocument(id);
      }
    );

    this.nativeWindow = this.windRefService.getNativeWindow();
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
