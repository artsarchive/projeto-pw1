import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreProjeto } from './sobre-projeto';

describe('SobreProjeto', () => {
  let component: SobreProjeto;
  let fixture: ComponentFixture<SobreProjeto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreProjeto],
    }).compileComponents();

    fixture = TestBed.createComponent(SobreProjeto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
