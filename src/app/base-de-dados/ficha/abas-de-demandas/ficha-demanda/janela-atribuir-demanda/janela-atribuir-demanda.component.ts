import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AcolhimentoDemandas } from 'src/models/enums/AcolhimentoEnums';
import { UsuarioEscopos } from 'src/models/enums/UsuarioEnums';
import { QueryOptions } from 'src/models/QueryOptions';
import { Usuario } from 'src/models/Usuario';
import { ApiService } from 'src/services/api.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-janela-atribuir-demanda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './janela-atribuir-demanda.component.html',
  styleUrls: ['./janela-atribuir-demanda.component.scss']
})
export class JanelaAtribuirDemandaComponent implements OnInit{
  @Output() saveAssignment = new EventEmitter<Usuario>();

  protected selectionIndex: number | undefined;

  protected usuarios: Array<Usuario> | undefined;
  constructor(public activeModal: NgbActiveModal, protected stateService: StateService, private apiService: ApiService, private router: Router) {}

  async ngOnInit() {
    try{
      const usuarioEscopo = this.getUsuarioEscopoByTipoDemanda();

      const queryOptions: QueryOptions = {filters: [{field: 'escopo', operator: 'in', value: usuarioEscopo}]};
      const usuarios = await this.apiService.fetchUsuarios(queryOptions);
      this.usuarios = usuarios!;

    }catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
  }

  protected save(): void {
    if(!this.selectionIndex){return;}

    let selectedUsuario = this.usuarios![this.selectionIndex!];

    this.saveAssignment.emit(selectedUsuario);
    this.activeModal.close();
  }

  private getUsuarioEscopoByTipoDemanda(): Array<UsuarioEscopos> {
    const tipoDemanda: AcolhimentoDemandas = this.stateService.getCurrentTipoDemanda()!;
    const escopo: Array<UsuarioEscopos> = [UsuarioEscopos.ADM, UsuarioEscopos.COORDENACAO]
    switch(tipoDemanda){
      case AcolhimentoDemandas.PSICOLOGIA:
        escopo.push(UsuarioEscopos.PSICOLOGIA);
        break;
      case AcolhimentoDemandas.JURIDICO:
        escopo.push(UsuarioEscopos.JURIDICO);
        break;
      case AcolhimentoDemandas.ASSISTENCIA_SOCIAL:
        escopo.push(UsuarioEscopos.ASSISTENCIA_SOCIAL);
        break;
      default:
        break;
    }
    return escopo;
  }
}
