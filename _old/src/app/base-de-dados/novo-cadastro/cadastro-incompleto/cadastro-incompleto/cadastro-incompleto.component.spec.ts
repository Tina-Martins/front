import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroIncompletoComponent } from './cadastro-incompleto.component';

describe('CadastroIncompletoComponent', () => {
  let component: CadastroIncompletoComponent;
  let fixture: ComponentFixture<CadastroIncompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroIncompletoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroIncompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
