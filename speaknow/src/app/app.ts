import { Component, signal } from '@angular/core';

@Component({
  selector: 'speaknow-root',
  templateUrl: './app.html',
  standalone: false,
  styles: []
})
export class App {
  protected readonly title = signal('speaknow');
}
