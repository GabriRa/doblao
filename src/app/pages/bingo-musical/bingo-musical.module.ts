import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoMusicalComponent } from './bingo-musical.component';
import { BingoRedirectComponent } from './bingo-redirect/bingo-redirect.component';
import { BingoMusicalRoutingModule } from './bingo-musical-routing.module';

@NgModule({
  declarations: [BingoMusicalComponent, BingoRedirectComponent],
  imports: [CommonModule, BingoMusicalRoutingModule],
})
export class BingoMusicalModule {}
