import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BingoMusicalComponent } from './bingo-musical.component';
import { BingoRedirectComponent } from './bingo-redirect/bingo-redirect.component';

const routes: Routes = [
  { path: '', component: BingoMusicalComponent },
  { path: 'redirect', component: BingoRedirectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BingoMusicalRoutingModule {}
