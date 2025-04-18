import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Demanda } from 'src/models/Demanda';
import { DateService } from 'src/services/date.service';
import { StateService } from 'src/services/state.service';
import { JanelaAtribuirDemandaComponent } from './janela-atribuir-demanda/janela-atribuir-demanda.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import { JanelaAtualizarStatusComponent } from './janela-atualizar-status/janela-atualizar-status.component';
import { AcolhimentoStatus } from 'src/models/enums/AcolhimentoEnums';
import { DemandaStatus } from 'src/models/enums/DemandaEnums';
import { JanelaNovoRegistroComponent } from './janela-novo-registro/janela-novo-registro.component';
import { Atendimento } from 'src/models/Atendimento';
import { JanelaVisualizarRegistroComponent } from './janela-visualizar-registro/janela-visualizar-registro.component';
import { Usuario } from 'src/models/Usuario';

@Component({
  selector: 'app-ficha-demanda',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ficha-demanda.component.html',
  styleUrls: ['./ficha-demanda.component.scss']
})
export class FichaDemandaComponent implements OnInit, OnDestroy {
  private saveAssignmentSubscription: Subscription | undefined;
  private saveUpdateStatusSubscription: Subscription | undefined;
  private saveRegistroSubscription: Subscription | undefined;
  private saveUpdateRegistroSubscription: Subscription | undefined;

  protected currentAcolhimentoDemanda!: Demanda;

  protected isDemandaAssigned: boolean = false;

  // private demandaAtribuida: Subscription | undefined;

  constructor(private stateService: StateService, private router: Router, protected dateService: DateService, private modalService: NgbModal, private apiService: ApiService){}

  ngOnInit(){
    try{
      let result = this.stateService.getCurrentAcolhimentoDemanda();
      console.log("Fetched demanda:");
      console.log(result);
      if(!result){ throw new Error("Demanda não encontrada"); }

      this.currentAcolhimentoDemanda = result;

      if(this.currentAcolhimentoDemanda.usuarioId && this.currentAcolhimentoDemanda.usuarioNome){
        // Demanda está atribuida a um usuario se e somente se o id e o nome do usuário forem definidos
        this.isDemandaAssigned = true;
      }else{
        this.isDemandaAssigned = false;
      }

    } catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
  }

  ngOnDestroy(): void {
    if(this.saveAssignmentSubscription){
      this.saveAssignmentSubscription.unsubscribe();
    }

    if(this.saveUpdateStatusSubscription){
      this.saveUpdateStatusSubscription.unsubscribe();
    }

    if(this.saveRegistroSubscription){
      this.saveRegistroSubscription.unsubscribe();
    }

    if(this.saveUpdateRegistroSubscription){
      this.saveUpdateRegistroSubscription.unsubscribe();
    }
  }

  protected getInicioAtendimento(): string{
    if(this.currentAcolhimentoDemanda.atendimentos){
      let inicioAtendimento = this.currentAcolhimentoDemanda.atendimentos[0].data;
      return this.dateService.makeDisplayableDate(inicioAtendimento);
    }else{
      return "Não iniciado";
    }
  }

  protected openAssignDemandaDialog(): void {
    const modalRef = this.modalService.open(JanelaAtribuirDemandaComponent); // Open the pop-up
    this.saveAssignmentSubscription = modalRef.componentInstance.saveAssignment.subscribe((usuario: Usuario) => {

      try{
        let currentDemanda = this.stateService.getCurrentAcolhimentoDemanda();
        if(!currentDemanda){ throw new Error("Demanda não encontrada"); }

        currentDemanda.usuarioId = usuario.id;
        currentDemanda.usuarioNome = usuario.nome;

        this.apiService.updateDemanda(currentDemanda)
        .catch((error) => {
          console.error(error);
          this.router.navigate(['/error']);
        });

        this.isDemandaAssigned = true;

      }catch(error){
        console.error(error);
        this.router.navigate(['/error']);
      }
    });
  }

  protected openUpdateStatusDialog(): void{
    const modalRef = this.modalService.open(JanelaAtualizarStatusComponent);
    this.saveUpdateStatusSubscription = modalRef.componentInstance.saveUpdateStatus.subscribe((statusUpdate: { newStatus: DemandaStatus, encaminhadoPara?: string, comentario: string }) => {
      try{
        let currentDemanda = this.stateService.getCurrentAcolhimentoDemanda();
        if(!currentDemanda){ throw new Error("Demanda não encontrada"); }

        currentDemanda.status = statusUpdate.newStatus;

        // TODO: encaminhadoPara e descrição não estão sendo usados

        console.log(statusUpdate);

        this.apiService.updateDemanda(currentDemanda);

      }catch(error){
        console.error(error);
        this.router.navigate(['/error']);
      }
    });
  }

  protected openNovoRegistroDialog(): void{
    const modalRef = this.modalService.open(JanelaNovoRegistroComponent);
    this.saveRegistroSubscription = modalRef.componentInstance.saveRegistro.subscribe((novoAtendimento: Atendimento) => {
      try{
        let currentDemanda = this.stateService.getCurrentAcolhimentoDemanda();
        if(!currentDemanda){ throw new Error("Demanda não encontrada"); }

        if(!currentDemanda.atendimentos){
          currentDemanda.atendimentos = [];
        }

        currentDemanda.atendimentos.push(novoAtendimento);
        console.log(currentDemanda);

        this.apiService.updateDemanda(currentDemanda);

      }catch(error){
        console.error(error);
        this.router.navigate(['/error']);
      }
    });
  }

  protected openVisualizarRegistroDialog(atendimento: Atendimento): void{
    this.stateService.setCurrentAtendimento(atendimento);
    const modalRef = this.modalService.open(JanelaVisualizarRegistroComponent);
    this.saveUpdateRegistroSubscription = modalRef.componentInstance.updateRegistro.subscribe((atendimento: Atendimento) => {
      try{
        let currentDemanda = this.stateService.getCurrentAcolhimentoDemanda();
        if(!currentDemanda){ throw new Error("Demanda não encontrada"); }

        if(!currentDemanda.atendimentos){
          throw new Error("Atendimentos não encontrados");
        }

        let index = currentDemanda.atendimentos.findIndex((atend) => atend.id === atendimento.id);
        if(index === -1){ throw new Error("Atendimento não encontrado"); }

        currentDemanda.atendimentos[index] = atendimento;

        this.apiService.updateDemanda(currentDemanda);

      }catch(error){
        console.error(error);
        this.router.navigate(['/error']);
      }
    });

  }
}
