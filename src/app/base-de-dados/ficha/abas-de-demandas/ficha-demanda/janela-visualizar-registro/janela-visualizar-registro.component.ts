import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Atendimento } from 'src/models/Atendimento';
import { DateService } from 'src/services/date.service';
import { FormsModule } from '@angular/forms';
import { Demanda } from 'src/models/Demanda';
import { StateService } from 'src/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-janela-visualizar-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './janela-visualizar-registro.component.html',
  styleUrls: ['./janela-visualizar-registro.component.scss']
})
export class JanelaVisualizarRegistroComponent implements OnInit {
  @Output() updateRegistro = new EventEmitter<Atendimento>();

  protected currentDemanda: Demanda | undefined;
  protected currentAtendimento: Atendimento | undefined;

  protected dataRegistro: string | undefined;
  protected descricao: string | undefined;

  constructor(public activeModal: NgbActiveModal, protected dateService: DateService, private stateService: StateService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try{
      this.currentDemanda = await this.stateService.getCurrentAcolhimentoDemanda(); 
      if(!this.currentDemanda){ throw new Error("Demanda não encontrada"); }

      this.currentAtendimento = await this.stateService.getCurrentAtendimento();
      if(!this.currentAtendimento){ throw new Error("Atendimento não encontrado"); }

      this.dataRegistro = new Date(this.currentAtendimento.data).toISOString().slice(0, 10);
      this.descricao = this.currentAtendimento.registro;

    }catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
    
  }

  protected save(): void {
    this.currentAtendimento!.registro = this.descricao!;

    this.updateRegistro.emit(this.currentAtendimento);
    this.activeModal.close();
  }

}