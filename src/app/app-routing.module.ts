import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PathListeningComponentComponent} from './path-listening-component/path-listening-component.component';

export const routes: Routes = [
  {
    path: 'one',
    component: PathListeningComponentComponent
  },
  {
    path: 'two',
    component: PathListeningComponentComponent
  },
  {
    path: 'three',
    component: PathListeningComponentComponent
  },
  {
    path: '**',
    redirectTo: '/one'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
