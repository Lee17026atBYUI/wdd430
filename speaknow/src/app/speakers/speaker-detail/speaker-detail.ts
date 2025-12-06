import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Speaker } from '../speaker.model';
import { SpeakerService } from '../speaker.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'speaknow-speaker-detail',
  standalone: false,
  templateUrl: './speaker-detail.html',
  styles: ``,
})
export class SpeakerDetail implements OnInit, OnDestroy {
  private speakerService = inject(SpeakerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  speaker: Speaker;
  private id: string;
  private subscription: Subscription;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.speaker = this.speakerService.getSpeaker(this.id);
      }
    );

    this.subscription = this.speakerService.speakerListChangedEvent.subscribe((speakers: Speaker[]) => {
      this.speaker = this.speakerService.getSpeaker(this.id);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onDelete() {
    this.speakerService.deleteSpeaker(this.speaker);
    this.router.navigateByUrl('speakers');
  }

}
