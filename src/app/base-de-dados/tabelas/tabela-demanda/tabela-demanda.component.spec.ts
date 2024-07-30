import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDemandaComponent } from './tabela-demanda.component';

describe('TabelaDemandaComponent', () => {
  let component: TabelaDemandaComponent;
  let fixture: ComponentFixture<TabelaDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaDemandaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
