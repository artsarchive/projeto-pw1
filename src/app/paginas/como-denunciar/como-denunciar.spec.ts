import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoDenunciar } from './como-denunciar';

describe('ComoDenunciar', () => {
  let component: ComoDenunciar;
  let fixture: ComponentFixture<ComoDenunciar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoDenunciar],
    }).compileComponents();

    fixture = TestBed.createComponent(ComoDenunciar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
