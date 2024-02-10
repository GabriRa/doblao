import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPhotosComponent } from './show-photos.component';
import { ShowPhotosRoutingModule } from './show-photos-routing.module';
import { MouseMovementComponent } from '../mouse-movement/mouse-movement.component';

@NgModule({
  declarations: [ShowPhotosComponent, MouseMovementComponent],
  imports: [CommonModule, ShowPhotosRoutingModule],
})
export class ShowPhotosModule {}
