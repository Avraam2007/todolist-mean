import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardField } from './card-field';

describe('CardField', () => {
  let component: CardField;
  let fixture: ComponentFixture<CardField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
