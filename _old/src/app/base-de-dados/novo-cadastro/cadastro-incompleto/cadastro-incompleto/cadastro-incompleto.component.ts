import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cadastro-incompleto',
  standalone: true,
  imports: [],
  templateUrl: './cadastro-incompleto.component.html',
  styleUrls: ['./cadastro-incompleto.component.scss']
})
export class CadastroIncompletoComponent {
  @Output() saveIncomplete = new EventEmitter<void>();
  
  constructor(public activeModal: NgbActiveModal){}

  onSaveIncomplete() {
    this.saveIncomplete.emit();
    this.activeModal.close();
  }
}
