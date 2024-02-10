import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowPhotosComponent } from './show-photos.component';
import { MouseMovementComponent } from '../mouse-movement/mouse-movement.component';

const routes: Routes = [
  { path: '', component: ShowPhotosComponent },
  { path: 'mouse-movement', component: MouseMovementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowPhotosRoutingModule {}
