import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaNovoEventoComponent } from './janela-novo-evento.component';

describe('JanelaNovoEventoComponent', () => {
  let component: JanelaNovoEventoComponent;
  let fixture: ComponentFixture<JanelaNovoEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JanelaNovoEventoComponent]
    });
    fixture = TestBed.createComponent(JanelaNovoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
