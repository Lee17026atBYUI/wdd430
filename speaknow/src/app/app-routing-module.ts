import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFound } from './not-found/not-found';
import { Speakers } from './speakers/speakers';
import { SpeakerEdit } from './speakers/speaker-edit/speaker-edit';
import { SpeakerDetail } from './speakers/speaker-detail/speaker-detail';
import { InviteSpeakers } from './speakers/invite-speakers/invite-speakers';

const routes: Routes = [
  {path: '', redirectTo: '/speakers', pathMatch: 'full'},
  {path: 'speakers', component: Speakers, children: [
    {path: 'invite', component: InviteSpeakers},
    {path: 'new', component: SpeakerEdit},
    {path: ':id', component: SpeakerDetail},
    {path: ':id/edit', component: SpeakerEdit},
  ]},
  {path: '404', component: NotFound},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
