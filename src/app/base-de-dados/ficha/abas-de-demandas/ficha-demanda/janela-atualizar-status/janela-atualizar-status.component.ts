import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DemandaStatus } from 'src/models/enums/DemandaEnums';
import { ApiService } from 'src/services/api.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-janela-atualizar-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './janela-atualizar-status.component.html',
  styleUrls: ['./janela-atualizar-status.component.scss']
})
export class JanelaAtualizarStatusComponent implements OnInit {
  @Output() saveUpdateStatus = new EventEmitter<{ newStatus: DemandaStatus, encaminhadoPara?: string, comentario: string }>();

  statusOptions: { value: DemandaStatus, label: string }[] = [];
  encaminhamentoOptions: string[] | undefined;

  newStatus: DemandaStatus = DemandaStatus.EM_ABERTO;
  encaminhadoPara: string | undefined;
  comentario: string = '';

  constructor(public activeModal: NgbActiveModal, private stateService: StateService, private apiService: ApiService, private router: Router){}

  async ngOnInit(): Promise<void> {
    try{
      this.statusOptions = Object.values(DemandaStatus).map(status => ({ value: status, label: status }));
      this.encaminhamentoOptions = (await this.apiService.fetchUsuarios()).map(usuario => usuario.nome);

      let currentDemanda = await this.stateService.getCurrentAcolhimentoDemanda();
      if(!currentDemanda){ throw new Error("Demanda não encontrada"); }
      
      this.newStatus = currentDemanda.status;
    } catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
  }

  updateStatus(): void {
    this.saveUpdateStatus.emit({ 
      newStatus: this.newStatus, 
      encaminhadoPara: this.newStatus === DemandaStatus.ENCAMINHADO ? this.encaminhadoPara : undefined,
      comentario: this.comentario 
    });
    this.activeModal.close();
  }
}