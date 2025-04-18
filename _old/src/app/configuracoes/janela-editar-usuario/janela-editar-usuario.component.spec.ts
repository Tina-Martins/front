import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaEditarUsuarioComponent } from './janela-editar-usuario.component';

describe('JanelaEditarUsuarioComponent', () => {
  let component: JanelaEditarUsuarioComponent;
  let fixture: ComponentFixture<JanelaEditarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JanelaEditarUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JanelaEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
