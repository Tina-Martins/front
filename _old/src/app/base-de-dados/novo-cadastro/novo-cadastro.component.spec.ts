import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCadastroComponent } from './novo-cadastro.component';

describe('NovoCadastroComponent', () => {
  let component: NovoCadastroComponent;
  let fixture: ComponentFixture<NovoCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NovoCadastroComponent]
    });
    fixture = TestBed.createComponent(NovoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
