import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Speaker } from '../speaker.model';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'speaknow-speaker-list',
  standalone: false,
  templateUrl: './speaker-list.html',
  styles: ``,
})
export class SpeakerList implements OnInit, OnDestroy {
  private speakerService = inject(SpeakerService);

  speakers: Speaker[] = [];
  speakerSub: Subscription;

  ngOnInit(): void {
    // console.log('spk list init');
    this.speakers = this.speakerService.getSpeakers();

    this.speakerSub = this.speakerService.speakerListChangedEvent.subscribe((speakerList: Speaker[]) => {
      this.speakers = speakerList;
    });
  }

  ngOnDestroy(): void {
    this.speakerSub.unsubscribe();
  }

}
