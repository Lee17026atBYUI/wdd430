import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SpeakerService } from '../speaker.service';
import { Speaker } from '../speaker.model';

@Component({
  selector: 'speaknow-invite-speakers',
  standalone: false,
  templateUrl: './invite-speakers.html',
  styles: ``,
})
export class InviteSpeakers implements OnInit, OnDestroy {
  private speakerService = inject(SpeakerService);

  speakers: Speaker[] = [];

 ngOnInit(): void {
  //  this.speakerService.findSpeakers();
  this.speakers = this.speakerService.getInvite();
 }

 ngOnDestroy(): void {
   
 }

}
