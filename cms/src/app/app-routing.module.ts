import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { Documents } from "./documents/documents";
import { MessageList } from "./messages/message-list/message-list";
import { Contacts } from "./contacts/contacts";
import { NotFound } from "./not-found/not-found";

const appRoutes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  {path: 'documents', component: Documents},
  {path: 'messages', component: MessageList},
  {path: 'contacts', component: Contacts},
  {path: '**', component: NotFound},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}