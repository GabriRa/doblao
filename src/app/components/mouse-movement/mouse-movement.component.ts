import { Component, HostListener, OnInit } from '@angular/core';

const ALL_IMG = [
  'https://fotosdoblao.blob.core.windows.net/2023/0.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/1.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/2.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/3.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/4.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/5.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/6.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/7.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/8.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/9.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/10.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/11.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/12.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/13.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/14.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/15.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/16.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/17.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/18.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/19.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/20.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/21.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/22.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/23.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/24.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/25.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/26.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/27.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/28.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/29.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/30.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/31.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/32.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/33.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/34.jpg',
  'https://fotosdoblao.blob.core.windows.net/2023/35.jpg',
];

@Component({
  selector: 'app-mouse-movement',
  templateUrl: './mouse-movement.component.html',
  styleUrls: ['./mouse-movement.component.scss'],
})
export class MouseMovementComponent {
  public readonly imgToShow = ALL_IMG;

  private readonly spaceChangeImg: number = 75;
  private readonly tailLength: number = 5;
  private readonly tailTransitionTime: number = 100;

  public currentImgCounter = 0;
  public tailEffectActive: boolean = false;
  public fullFrameOpen: boolean = false;

  private lastSavedMousePosition: number[] = [0, 0];
  private lastImagePosition: number[] = [0, 0];

  private tailImages: HTMLElement[] = [];
  private images: HTMLElement[] = [];

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    // Calculates distance between current mouse position and last position
    const currentDistance = Math.hypot(
      event.clientX - this.lastSavedMousePosition[0],
      event.clientY - this.lastSavedMousePosition[1]
    );

    if (this.images.length === 0) {
      this.images = Array.from(
        document.querySelectorAll<HTMLElement>(`.mouse-movement-img`)
      );
    }

    // If bigger, updates image
    if (currentDistance > this.spaceChangeImg) {
      this.showAndMoveImage(event);
      this.lastSavedMousePosition = [event.clientX, event.clientY];
    }
  }

  constructor() {}

  // Show/Hide Iamges and its tail
  public showAndMoveImage(event: MouseEvent): void {
    // Prevents working when full frame is open
    if (this.fullFrameOpen) return;

    // Stop if effect is in procces
    if (this.tailEffectActive) return;

    // Prevents case when last images are not hidden
    let correctedImgCounter: number = this.currentImgCounter - this.tailLength;
    if (correctedImgCounter < 0) {
      correctedImgCounter =
        this.imgToShow.length + (this.currentImgCounter - this.tailLength);
    }

    // Hide img show
    const lastElement = document.querySelector<HTMLElement>(
      `#mouse-movement-img-${correctedImgCounter}`
    );
    lastElement?.classList.remove('mouse-movement-img--visible');

    // Show img
    const currentElement = document.querySelector<HTMLElement>(
      `#mouse-movement-img-${this.currentImgCounter}`
    );
    currentElement?.classList.add('mouse-movement-img--visible');
    currentElement?.classList.remove('mouse-movement-img--hide');

    // Refresh tail
    this.tailImages = [];

    // refresh zindex
    for (let index = 0; index < this.tailLength; index++) {
      let indexImg: number = this.currentImgCounter - index;
      if (indexImg < 0) {
        indexImg = this.imgToShow.length + (this.currentImgCounter - index);
      }

      const elm = document.querySelector<HTMLElement>(
        `#mouse-movement-img-${indexImg}`
      ) as HTMLElement;
      if (elm) {
        elm.style.zIndex = (this.tailLength - index).toString();
      }

      this.tailImages.push(elm);
    }

    // Move img
    if (currentElement) {
      currentElement.style.left =
        event.clientX - currentElement.offsetWidth / 2 + 'px';
      currentElement.style.top =
        event.clientY - currentElement.offsetHeight / 2 + 'px';
    }

    // Add one to the counter for the next mouseMovement
    this.currentImgCounter++;

    // Limit the counter
    if (this.currentImgCounter > this.imgToShow.length) {
      this.currentImgCounter = 0;
    }
  }

  // Open full frame
  public clickImage(event: Event): void {
    // Stop if effect is in procces
    if (this.tailEffectActive) return;

    // // Get target element
    // if (!event.currentTarget) return;
    // const frameElm = event.currentTarget as HTMLElement;

    // Get img element
    const imageFrameElm: HTMLElement = this.tailImages[0];
    if (!imageFrameElm) return;

    // Start tail effect
    this.tailEffectActive = true;

    // Close full frame
    if (this.fullFrameOpen) {
      return this.closeFullFrame(imageFrameElm);
    }

    // Set full frame as open
    this.fullFrameOpen = true;

    // Hide images from behind
    for (let index = 0; index < this.tailLength - 1; index++) {
      let indexImg: number = this.currentImgCounter - index - 2;
      if (indexImg < 0) {
        indexImg = this.imgToShow.length + (this.currentImgCounter - index);
      }

      const elm = document.querySelector<HTMLElement>(
        `#mouse-movement-img-${indexImg}`
      );
      if (elm) {
        setTimeout(() => {
          elm.classList.add('mouse-movement-img--hide');
        }, 500 - index * this.tailTransitionTime);
      }
    }

    // Add classes. Full frame and transition
    setTimeout(() => {
      imageFrameElm.classList.add(
        'mouse-movement-img--transition',
        'mouse-movement-img--full'
      );

      // Center img
      imageFrameElm.style.left = 'unset';
      imageFrameElm.style.top = 'unset';
    }, 900);

    setTimeout(() => {
      this.tailEffectActive = false;
    }, 1000);

    // Save img position
    this.lastImagePosition = [
      parseInt(imageFrameElm.style.left, 10),
      parseInt(imageFrameElm.style.top, 10),
    ];

    // Center img
    imageFrameElm.style.left =
      window.innerWidth / 2 - imageFrameElm.offsetWidth / 2 + 'px';
    imageFrameElm.style.top =
      window.innerHeight / 2 - imageFrameElm.offsetHeight / 2 + 'px';
  }

  // Close full frame
  private closeFullFrame(imageFrameElm: HTMLElement): void {
    // Reset image to its original position
    imageFrameElm.style.left = this.lastImagePosition[0].toString() + 'px';
    imageFrameElm.style.top = this.lastImagePosition[1].toString() + 'px';

    // Remove classes. Full frame and transition
    imageFrameElm.classList.remove(
      'mouse-movement-img--transition',
      'mouse-movement-img--full'
    );

    // Hide images from behind
    this.tailImages.map((img: HTMLElement, index) => {
      setTimeout(() => {
        img.classList.remove('mouse-movement-img--hide');
      }, 100 + index * this.tailTransitionTime);
    });

    setTimeout(() => {
      this.tailEffectActive = false;
    }, 1000);

    // Reset fullFrame
    this.fullFrameOpen = false;
  }

  // Changes full frame image
  public changeImage(movement: number, event: Event): void {
    // Prevents default
    event.preventDefault();
    event.stopPropagation();

    // Stop if effect is in procces
    if (this.tailEffectActive) return;

    // Only when frame is open
    if (!this.fullFrameOpen) return;

    const imgElm: HTMLElement = this.tailImages[0];
    if (!imgElm) return;

    // Hide current img
    imgElm.classList.remove(
      'mouse-movement-img--transition',
      'mouse-movement-img--full'
    );
    imgElm.classList.add('mouse-movement-img--hide');
    imgElm.style.zIndex = '0';

    // Current index + movement
    const changedIndex = this.currentImgCounter - 1 + movement;

    // Show next img show
    const nextImgToShow = this.images[changedIndex];
    nextImgToShow?.classList.add(
      'mouse-movement-img--visible',
      'mouse-movement-img--full'
    );
    nextImgToShow?.classList.remove('mouse-movement-img--hide');

    // Center img
    // nextImgToShow.style.left =
    //   window.innerWidth / 2 - nextImgToShow.offsetWidth / 2 + 'px';
    // nextImgToShow.style.top =
    //   window.innerHeight / 2 - nextImgToShow.offsetHeight / 2 + 'px';
    nextImgToShow.style.left = 'unset';
    nextImgToShow.style.top = 'unset';

    // Refresh tail
    this.tailImages = this.images
      .slice(changedIndex - this.tailLength + 1, changedIndex + 1)
      .reverse();

    this.tailImages.map((tailImgElm: HTMLElement, index: number) => {
      // tailImgElm.classList.remove('mouse-movement-img--hide');
      tailImgElm.classList.add('mouse-movement-img--visible');
      tailImgElm.style.zIndex = (this.tailLength - index).toString();
    });

    // TODO Existe la clase visible de cuando esta en el tail
    // hay que quitarla tambien

    // Change counter and limits it
    this.currentImgCounter = this.currentImgCounter + movement;
    if (this.currentImgCounter < 0) {
      this.currentImgCounter = this.imgToShow.length - 1;
    }
    if (this.currentImgCounter === this.imgToShow.length) {
      this.currentImgCounter = 0;
    }

    // TODO: Actualizar los z.index
    // Error al centrar imagen al abrir full frame
    // Error en cola cuando da la vuelta

    // const elements = document.querySelectorAll<HTMLElement>('.mouse-movement-img');
    // const arrayElm = Array.from(elements);
    // arrayElm.map((elm: Element) => {

    // })
    // get elements with clase --hide
    // tras coger todos los elementos, sumar o restar el index
    // cambiar tambien la calse --hide

    // console.log(imgElm);

    // actualizar la cola de imagenes al cambiar de imagen para mantener el efecto
  }

  // hay tres botones, atras, volver y siguiente foto
  // Fotos en vertical no se ven bien con el tamaño
  // mirar com ohacer la foto grande pero mantener el limite de la pantalla

  // TODO: Mobile foto

  // Se puede mejorar creando solo 5 elementos de imagenes, ir actualizacndo
  // hacerlo desde angualr en vez de calses de css
}
