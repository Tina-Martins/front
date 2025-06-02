import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Atendimento } from 'src/models/Atendimento';
import { Demanda } from 'src/models/Demanda';
import { DateService } from 'src/services/date.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-janela-novo-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './janela-novo-registro.component.html',
  styleUrls: ['./janela-novo-registro.component.scss']
})
export class JanelaNovoRegistroComponent implements OnInit {
  @Output() saveRegistro = new EventEmitter<Atendimento>();

  protected registro: string = '';
  protected dataRegistro: string = new Date().toISOString().slice(0, 10);
  
  protected currentDemanda: Demanda | undefined;

  constructor(public activeModal: NgbActiveModal, private stateService: StateService, private router: Router, private dateService: DateService) {}

  ngOnInit(): void {
    try{
      this.currentDemanda = this.stateService.getCurrentAcolhimentoDemanda();
      if(!this.currentDemanda){ throw new Error("Demanda não encontrada"); }

    }catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
  }

  protected save(): void {
    if(!this.registro || !this.dataRegistro){ return; }

    let atendimento: Atendimento = {
      data: this.dateService.makeISODate(this.dataRegistro),
      registro: this.registro,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      regAtivo: true
    };

    this.saveRegistro.emit(atendimento);
    this.activeModal.close();
  }
}