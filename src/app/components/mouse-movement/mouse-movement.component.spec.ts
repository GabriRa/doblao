import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseMovementComponent } from './mouse-movement.component';

describe('MouseMovementComponent', () => {
  let component: MouseMovementComponent;
  let fixture: ComponentFixture<MouseMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouseMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouseMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
