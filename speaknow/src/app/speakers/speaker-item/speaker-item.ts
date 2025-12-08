import { Component, inject, Input, OnInit } from '@angular/core';

import { Speaker } from '../speaker.model';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'speaknow-speaker-item',
  standalone: false,
  templateUrl: './speaker-item.html',
  styles: ``,
})
export class SpeakerItem {
  @Input() speaker: Speaker;
  @Input() isClick: boolean = true;

  private speakerService = inject(SpeakerService);

  onClick(months: number = 0) {
    const today = new Date();
    const newDate = new Date(today.setMonth(today.getMonth() + months));
    const newSpeaker = new Speaker(this.speaker._id, this.speaker.name, newDate);

    this.speakerService.updateSpeaker(this.speaker, newSpeaker);
  }
}
