import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformDialog } from './inform-dialog';

describe('InformDialog', () => {
  let component: InformDialog;
  let fixture: ComponentFixture<InformDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
