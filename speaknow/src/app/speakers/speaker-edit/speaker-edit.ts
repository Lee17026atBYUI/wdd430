import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SpeakerService } from '../speaker.service';
import { Speaker } from '../speaker.model';

@Component({
  selector: 'speaknow-speaker-edit',
  standalone: false,
  templateUrl: './speaker-edit.html',
  styles: ``,
})
export class SpeakerEdit implements OnInit, OnDestroy {
  private speakerService = inject(SpeakerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private subscription: Subscription;
  originalSpeaker: Speaker;
  speaker: Speaker;
  editMode: boolean = false;
  id: string;

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if (this.id == null) {
          this.editMode = false;
          return;
        }

        this.originalSpeaker = this.speakerService.getSpeaker(this.id);

        if (this.originalSpeaker == null) return;

        this.editMode = true;
        this.speaker = {...this.originalSpeaker};
        // console.log('speaker-edit init', this.speaker);
      }
    );

    this.subscription = this.speakerService.speakerListChangedEvent.subscribe((speaker: Speaker[]) => {
      if (this.id == null) {
        this.editMode = false;
        return;
      }
      this.originalSpeaker = this.speakerService.getSpeaker(this.id);
      if (this.originalSpeaker == null) return;
      this.editMode = true;
      this.speaker = {...this.originalSpeaker};
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatDate(date: Date) {
    if (!date) return;
    return date.toISOString().split('T')[0];
  }

}
