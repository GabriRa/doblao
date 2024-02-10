import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoMusicalComponent } from './bingo-musical.component';

describe('BingoMusicalComponent', () => {
  let component: BingoMusicalComponent;
  let fixture: ComponentFixture<BingoMusicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoMusicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BingoMusicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
