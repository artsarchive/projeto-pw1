import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasAfetadas } from './areas-afetadas';

describe('AreasAfetadas', () => {
  let component: AreasAfetadas;
  let fixture: ComponentFixture<AreasAfetadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreasAfetadas],
    }).compileComponents();

    fixture = TestBed.createComponent(AreasAfetadas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
