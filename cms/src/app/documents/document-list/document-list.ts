import { Component, EventEmitter, Output } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'Syllabus', 'Contract of course outcomes and schedule.', 'www.nice.com', null),
    new Document(2, 'Book of Mormon', 'Entire text of this book of scripture.', 'www.okay.com', null),
    new Document(3, 'Papyrus', 'ASCII art of some Egyptian papyri.', 'www.cool.com', null),
    new Document(4, 'Virus', 'It is malware.', 'www.neat.com', null),
    new Document(5, 'Instructions', 'Here be text.', 'www.super.com', null),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
