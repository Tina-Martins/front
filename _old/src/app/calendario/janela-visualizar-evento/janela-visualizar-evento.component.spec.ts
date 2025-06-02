import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaVisualizarEventoComponent } from './janela-visualizar-evento.component';

describe('JanelaVisualizarEventoComponent', () => {
  let component: JanelaVisualizarEventoComponent;
  let fixture: ComponentFixture<JanelaVisualizarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JanelaVisualizarEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JanelaVisualizarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
