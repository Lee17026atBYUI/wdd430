import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Speaker } from './speaker.model';

const NJSURL = 'http://localhost:3000/speakers/';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  private http = inject(HttpClient);

  private targetSpeakers = 4;
  speakers: Speaker[] = [
    // new Speaker('abc', 'Bob', new Date('2025-1-1')),
    // new Speaker('sdfg', 'Greg', new Date('2025-3-13')),
    // new Speaker('abdgc', 'Fred', new Date('2025-6-26')),
    // new Speaker('abgc', 'Mildred', new Date('2024-1-6')),
    // new Speaker('sdfhg', 'Adeline', new Date('2025-9-5')),
    // new Speaker('adfdfgc', 'Mabel'),
  ];
  inviteSpeakers: Speaker[] = [
    // new Speaker('abc', 'Bob', new Date('2025-1-1')),
    // new Speaker('sdfg', 'Greg', new Date('2025-3-3')),
  ];
  speakerListChangedEvent = new Subject<Speaker[]>();
  inviteSpeakersListChangedEvent = new Subject<Speaker[]>();

  getSpeakers() {
    this.http.get<{speakers: Speaker[]}>(NJSURL).subscribe((res) => {
      this.speakers = res.speakers;
      this.speakerListChangedEvent.next(this.speakers.slice());
      this.getInvite();
    });
  }

  getSpeaker(id: string): Speaker | null {
    for (const speaker of this.speakers) {
      if (speaker._id === id) {
        return speaker;
      }
    }
    return null;
  }

  getInvite(): Speaker[] {
    this.findSpeakers();
    this.inviteSpeakersListChangedEvent.next(this.inviteSpeakers.slice());
    return this.inviteSpeakers.slice();;
  }

  findSpeakers() {
    let numSpeakers = 0;
    this.inviteSpeakers = [];

    // just grab people that never spoke (no date)
    for (let i = 0; i < this.speakers.length; i++) {
      if (this.speakers[i].lastSpoke === undefined || this.speakers[i].lastSpoke == null) {
        this.inviteSpeakers.push({ ...this.speakers[i] });
        numSpeakers++;
        if (numSpeakers >= this.targetSpeakers) {
          return;
        }
      }
    }

    // sort remaining speakers by date
    let copySpeakers = this.speakers.filter((speaker) => speaker.lastSpoke);
    copySpeakers.sort((a, b) => {
      if (a.lastSpoke < b.lastSpoke) return -1;
      if (a.lastSpoke > b.lastSpoke) return 1;
      return 0;
    });

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

    this.http.delete(NJSURL + speaker._id).subscribe(res => {
      this.speakers.splice(pos, 1);
      this.speakerListChangedEvent.next(this.speakers.slice());
    })
  }

  updateSpeaker(originalSpeaker: Speaker, newSpeaker: Speaker) {
    if (originalSpeaker == null || newSpeaker == null) return;

    newSpeaker._id = originalSpeaker._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<{ speakers: Speaker[] }>(NJSURL + originalSpeaker._id, newSpeaker, {headers: headers}).subscribe((responseData) => {
      this.speakers = responseData.speakers;
      this.speakerListChangedEvent.next(this.speakers.slice());
      this.getInvite();
    });
    
  }

  addSpeaker(newSpeaker: Speaker) {
    if (newSpeaker == null) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<{ message: string; speaker: Speaker}>(NJSURL, newSpeaker, {headers: headers}).subscribe((responseData) => {
      this.speakers.push(responseData.speaker);
      this.speakerListChangedEvent.next(this.speakers.slice());
    });
  }
}
