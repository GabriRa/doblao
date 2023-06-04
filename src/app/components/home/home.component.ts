import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public boxParallax = [
    {
      title: 'Título',
      parallaxImg: [
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%200.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%2013.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%202.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%203.jpg',
      ],
    },
    {
      title: 'Título',
      parallaxImg: [
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%204.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%2015.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%206.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%2016.jpg',
      ],
    },
    {
      title: 'Título',
      parallaxImg: [
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%2020.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%2033.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%2021.jpg',
        'https://fotosdoblao.blob.core.windows.net/byn/Foto%2036.jpg',
      ],
    },
  ];

  constructor() {}
}
