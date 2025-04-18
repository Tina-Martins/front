import { Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Acolhimento } from 'src/models/Acolhimento';
import 'src/models/enums/AcolhimentoEnums';
import { AcolhimentoDemandas, AcolhimentoDocumentoTipo, AcolhimentoEscolaridade, AcolhimentoOrientacaoSexual, AcolhimentoOrigem, AcolhimentoRacaCor, AcolhimentoServicoReferencia, AcolhimentoStatus } from 'src/models/enums/AcolhimentoEnums';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroIncompletoComponent } from './cadastro-incompleto/cadastro-incompleto/cadastro-incompleto.component';
import { Subscription } from 'rxjs';
import { DateService } from 'src/services/date.service';

@Component({
  selector: 'app-novo-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.scss']
})
export class NovoCadastroComponent implements OnDestroy{
  @ViewChild('acolhimentoForm') acolhimentoForm!: NgForm;
  protected tried_submit: boolean = false;
  
  protected acolhimento: Acolhimento = {
    nome: '',
    demandas: [],
    status: AcolhimentoStatus.ATIVO,
  };

  protected acolhimentoDemandas = Object.values(AcolhimentoDemandas);
  protected selectedDemandas: { [key: string]: boolean } = {};

  protected acolhimentoOrigens: string[] = Object.values(AcolhimentoOrigem);
  protected acolhimentoServicosReferencia: string[] = Object.values(AcolhimentoServicoReferencia);
  protected acolhimentoDocumentoTipos = Object.values(AcolhimentoDocumentoTipo);
  protected acolhimentoRacaCores = Object.values(AcolhimentoRacaCor);
  protected acolhimentoEscolaridades = Object.values(AcolhimentoEscolaridade);
  protected acolhimentoOrientacaoSexuais = Object.values(AcolhimentoOrientacaoSexual);

  private saveIncompleteSubscription: Subscription | undefined;

  constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal, private dateService: DateService) {}

  ngOnInit() {
    // Initialize selectedDemandas with false for each demand
    this.acolhimentoDemandas.forEach(
      (demanda) => (this.selectedDemandas[demanda] = false)
    );
  }

  ngOnDestroy(): void {
    if(this.saveIncompleteSubscription){
      this.saveIncompleteSubscription.unsubscribe();
    }
  }

  protected cancel() {
    this.router.navigate(['/']);
  }

  protected isAnyDemandaSelected() {
    for(let demanda in this.selectedDemandas){
      if(this.selectedDemandas[demanda]==true){
        return true;
      }
    }

    return false;
  }

  protected save() {
    this.tried_submit = true;

    let minimum_valid_state: boolean = (this.acolhimento.nome.length!=0 && this.isAnyDemandaSelected() && !!this.acolhimento.dataNascimento);

    if(!minimum_valid_state){ // User has to select at least one demanda and fill the name field
      this.acolhimentoForm.control.markAllAsTouched();
      return;
    }

    // here both name and demandas are filled
    this.acolhimento.demandas = this.acolhimentoDemandas.filter(
      (demanda) => this.selectedDemandas[demanda]
    );

    if(this.acolhimento.dataNascimento){
      let dataNascimento = this.dateService.makeISODate(this.acolhimento.dataNascimento);
      this.acolhimento.dataNascimento = dataNascimento;
    }

    this.acolhimentoForm

    if (this.acolhimentoForm.valid) { // Form fully filled
      console.info("Registering acolhimento:")
      console.info(this.acolhimento);
  
      this.apiService.postAcolhimento(this.acolhimento)
        .then(() => { this.router.navigate(['/']); })
        .catch((error) => {
          console.error("Error posting acolhimento:");
          console.error(error);
          this.router.navigate(['/error']);
        });

    }else{ // Form is incomplete
      const modalRef = this.modalService.open(CadastroIncompletoComponent); // Open the pop-up
      this.saveIncompleteSubscription = modalRef.componentInstance.saveIncomplete.subscribe(() => {
        console.log("Saving incomplete form..."); 
        console.info(this.acolhimento);
        
        this.apiService.postAcolhimento(this.acolhimento)
          .then(() => { this.router.navigate(['/']); })
          .catch((error) => {
            console.error("Error posting acolhimento:");
            console.error(error);
            this.router.navigate(['/error']);
          });
          
      });
    }
    
  }
}
