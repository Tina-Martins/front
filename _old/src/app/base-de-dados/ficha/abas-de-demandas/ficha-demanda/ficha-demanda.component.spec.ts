import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDemandaComponent } from './ficha-demanda.component';

describe('FichaDemandaComponent', () => {
  let component: FichaDemandaComponent;
  let fixture: ComponentFixture<FichaDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaDemandaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FichaDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
