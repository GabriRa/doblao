import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoRedirectComponent } from './bingo-redirect.component';

describe('BingoRedirectComponent', () => {
  let component: BingoRedirectComponent;
  let fixture: ComponentFixture<BingoRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BingoRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
