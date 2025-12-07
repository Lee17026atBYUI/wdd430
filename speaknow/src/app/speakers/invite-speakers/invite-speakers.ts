import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  private subscription: Subscription;

 ngOnInit(): void {
  this.speakers = this.speakerService.getInvite();

  this.subscription = this.speakerService.inviteSpeakersListChangedEvent.subscribe((speakers: Speaker[]) => {
    this.speakers = speakers;
  })
 }

 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }

}
