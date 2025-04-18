import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaAtribuirDemandaComponent } from './janela-atribuir-demanda.component';

describe('JanelaAtribuirDemandaComponent', () => {
  let component: JanelaAtribuirDemandaComponent;
  let fixture: ComponentFixture<JanelaAtribuirDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JanelaAtribuirDemandaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JanelaAtribuirDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
