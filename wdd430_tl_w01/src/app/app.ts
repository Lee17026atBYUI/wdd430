import { Component, signal } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('wdd430_tl_w01');
  constructor() {
    $(document).ready(() => {
      console.log('This is a test for Jquery alert');
    });
  }
}
