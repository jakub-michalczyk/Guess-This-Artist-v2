import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessScreenComponent } from './guess-screen.component';

describe('GuessScreenComponent', () => {
  let component: GuessScreenComponent;
  let fixture: ComponentFixture<GuessScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
