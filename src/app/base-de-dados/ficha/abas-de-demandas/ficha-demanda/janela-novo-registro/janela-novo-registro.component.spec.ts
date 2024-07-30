import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaNovoRegistroComponent } from './janela-novo-registro.component';

describe('JanelaNovoRegistroComponent', () => {
  let component: JanelaNovoRegistroComponent;
  let fixture: ComponentFixture<JanelaNovoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JanelaNovoRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JanelaNovoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
