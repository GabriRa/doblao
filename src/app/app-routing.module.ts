import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'show-photos',
    loadChildren: () =>
      import('./components/show-photos/show-photos.module').then(
        (m) => m.ShowPhotosModule
      ),
  },
  {
    path: 'bingo-musical',
    loadChildren: () =>
      import('./pages/bingo-musical/bingo-musical.module').then(
        (m) => m.BingoMusicalModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
