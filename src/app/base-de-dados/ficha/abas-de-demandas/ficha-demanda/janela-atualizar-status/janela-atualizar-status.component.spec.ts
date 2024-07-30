import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaAtualizarStatusComponent } from './janela-atualizar-status.component';

describe('JanelaAtualizarStatusComponent', () => {
  let component: JanelaAtualizarStatusComponent;
  let fixture: ComponentFixture<JanelaAtualizarStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JanelaAtualizarStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JanelaAtualizarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
