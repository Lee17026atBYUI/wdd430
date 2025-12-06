import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { Speaker } from '../speaker.model';

@Component({
  selector: 'speaknow-speaker-item',
  standalone: false,
  templateUrl: './speaker-item.html',
  styles: ``,
})
export class SpeakerItem implements OnInit {
  @Input() speaker: Speaker;
  @Input() isClick: boolean = true;

  ngOnInit(): void {
    // console.log(this.speaker.lastSpoke);
  }
}
