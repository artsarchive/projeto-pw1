import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenuncieAqui } from './denuncie-aqui';

describe('DenuncieAqui', () => {
  let component: DenuncieAqui;
  let fixture: ComponentFixture<DenuncieAqui>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenuncieAqui],
    }).compileComponents();

    fixture = TestBed.createComponent(DenuncieAqui);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
