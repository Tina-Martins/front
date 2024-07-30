import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaVisualizarRegistroComponent } from './janela-visualizar-registro.component';

describe('JanelaVisualizarRegistroComponent', () => {
  let component: JanelaVisualizarRegistroComponent;
  let fixture: ComponentFixture<JanelaVisualizarRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JanelaVisualizarRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JanelaVisualizarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
