import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Speaker } from './speaker.model';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  private http = inject(HttpClient);

  private targetSpeakers = 4;
  speakers: Speaker[] = [
    new Speaker('abc', 'Bob', new Date('2025-1-1')),
    new Speaker('sdfg', 'Greg', new Date('2025-3-13')),
    new Speaker('abdgc', 'Fred', new Date('2025-6-26')),
    new Speaker('abgc', 'Mildred', new Date('2024-1-6')),
    new Speaker('sdfhg', 'Adeline', new Date('2025-9-5')),
    new Speaker('adfdfgc', 'Mabel'),
  ];
  inviteSpeakers: Speaker[] = [
    // new Speaker('abc', 'Bob', new Date('2025-1-1')),
    // new Speaker('sdfg', 'Greg', new Date('2025-3-3')),
  ];
  speakerListChangedEvent = new Subject<Speaker[]>();
  inviteSpeakersListChangedEvent = new Subject<Speaker[]>();

  getSpeakers(): Speaker[] {
    // console.log(this.speakers);
    this.speakerListChangedEvent.next(this.speakers.slice());

    return this.speakers.slice();
  }

  getSpeaker(id: string): Speaker | null {
    for (const speaker of this.speakers) {
      if (speaker._id === id) {
        // console.log('getSpeaker', speaker);
        return speaker;
      }
    }
    // console.log('nada');
    return null;
  }

  getInvite(): Speaker[] {
    this.findSpeakers();
    return this.inviteSpeakers.slice();;
  }

  findSpeakers() {
    let numSpeakers = 0;
    this.inviteSpeakers = [];

    // just grab people that never spoke (no date)
    // console.log(this.speakers);
    for (let i = 0; i < this.speakers.length; i++) {
      if (this.speakers[i].lastSpoke === undefined) {
        // console.log(this.speakers[i]);
        this.inviteSpeakers.push({ ...this.speakers[i] });
        numSpeakers++;
        if (numSpeakers >= this.targetSpeakers) {
          return;
        }
      }
    }

    // sort remaining speakers by date
    let copySpeakers = this.speakers.filter((speaker) => speaker.lastSpoke);
    // console.log(copySpeakers);
    copySpeakers.sort((a, b) => {
      if (a.lastSpoke < b.lastSpoke) return -1;
      if (a.lastSpoke > b.lastSpoke) return 1;
      return 0;
    });
    // console.log(copySpeakers);

    // then grab from the furthest date if we don't have enough
    for (let i = 0; i < copySpeakers.length; i++) {
      this.inviteSpeakers.push({ ...copySpeakers[i] });
      numSpeakers++;
      if (numSpeakers >= this.targetSpeakers) {
        return;
      }
    }
  }

  deleteSpeaker(speaker: Speaker) {
    if (!speaker) {
      return;
    }
    const pos = this.speakers.indexOf(speaker);
    if (pos < 0) {
      return;
    }

    // call DELETE
  }
}
