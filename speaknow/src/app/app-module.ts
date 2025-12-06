import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header';
import { Speakers } from './speakers/speakers';
import { SpeakerDetail } from './speakers/speaker-detail/speaker-detail';
import { SpeakerEdit } from './speakers/speaker-edit/speaker-edit';
import { SpeakerItem } from './speakers/speaker-item/speaker-item';
import { SpeakerList } from './speakers/speaker-list/speaker-list';
import { NotFound } from './not-found/not-found';
import { InviteSpeakers } from './speakers/invite-speakers/invite-speakers';

@NgModule({
  declarations: [
    App,
    Header,
    Speakers,
    SpeakerDetail,
    SpeakerEdit,
    SpeakerItem,
    SpeakerList,
    NotFound,
    InviteSpeakers
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
