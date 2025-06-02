import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Acolhimento } from 'src/models/Acolhimento';
import { AcolhimentoDemandas, AcolhimentoDocumentoTipo, AcolhimentoEscolaridade, AcolhimentoOrientacaoSexual, AcolhimentoOrigem, AcolhimentoRacaCor, AcolhimentoServicoReferencia, AcolhimentoStatus } from 'src/models/enums/AcolhimentoEnums';
import { ApiService } from 'src/services/api.service';
import { CadastroIncompletoComponent } from '../../novo-cadastro/cadastro-incompleto/cadastro-incompleto/cadastro-incompleto.component';
import { StateService } from 'src/services/state.service';
import { DateService } from 'src/services/date.service';

@Component({
  selector: 'app-editar-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './editar-cadastro.component.html',
  styleUrls: ['./editar-cadastro.component.scss']
})
export class EditarCadastroComponent implements OnInit{
  @ViewChild('acolhimentoForm') acolhimentoForm!: NgForm;
  protected tried_submit: boolean = false;
  
  protected acolhimento!: Acolhimento;
  protected dataNascimento: string | undefined;
  protected psicologiaCheckbox: boolean = false;
  protected juridicoCheckbox: boolean = false;
  protected assistenciaSocialCheckbox: boolean = false;
  protected abrigamentosCheckbox: boolean = false;

  protected acolhimentoOrigens: string[] = Object.values(AcolhimentoOrigem);
  protected acolhimentoServicosReferencia: string[] = Object.values(AcolhimentoServicoReferencia);
  protected acolhimentoDocumentoTipos = Object.values(AcolhimentoDocumentoTipo);
  protected acolhimentoRacaCores = Object.values(AcolhimentoRacaCor);
  protected acolhimentoEscolaridades = Object.values(AcolhimentoEscolaridade);
  protected acolhimentoOrientacaoSexuais = Object.values(AcolhimentoOrientacaoSexual);

  private saveIncompleteSubscription: Subscription | undefined;

  constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal,  private stateService: StateService, private dateService: DateService) {}

  ngOnInit() {
    try {
      let result = this.stateService.getCurrentAcolhimento();
      if(!result){ throw new Error("No acolhimento found in state service"); }

      this.acolhimento = result;

    } catch(error){
      console.error("Error getting current acolhimento:");
      console.error(error);
      this.router.navigate(['/error']);
      return;
    }

    // // Initialize selectedDemandas for each demand
    this.psicologiaCheckbox = this.acolhimento.demandas.includes(AcolhimentoDemandas.PSICOLOGIA);
    this.juridicoCheckbox = this.acolhimento.demandas.includes(AcolhimentoDemandas.JURIDICO);
    this.assistenciaSocialCheckbox = this.acolhimento.demandas.includes(AcolhimentoDemandas.ASSISTENCIA_SOCIAL);
    this.abrigamentosCheckbox = this.acolhimento.demandas.includes(AcolhimentoDemandas.ABRIGAMENTO);

    // Initialize dataNascimento
    this.dataNascimento = this.acolhimento.dataNascimento ? new Date(this.acolhimento.dataNascimento).toISOString().slice(0, 10) : ''; 
  }

  ngOnDestroy(): void {
    if(this.saveIncompleteSubscription){
      this.saveIncompleteSubscription.unsubscribe();
    }
  }

  protected cancel() {
    this.router.navigate(['/base-de-dados/ficha']);
  }

  protected isAnyDemandaSelected() {
    return this.psicologiaCheckbox || this.juridicoCheckbox || this.assistenciaSocialCheckbox || this.abrigamentosCheckbox;
  }

  protected save() {
    this.tried_submit = true;
    console.log(this.dataNascimento)
    let minimum_valid_state: boolean = (this.acolhimento?.nome.length!=0 && this.isAnyDemandaSelected() && !!this.dataNascimento);

    if(!minimum_valid_state){ // User has to select at least one demanda and fill the name field
      this.acolhimentoForm.control.markAllAsTouched();
      return;
    }

    // here both name and demandas are filled
    let selectedDemandas = [];
    if(this.psicologiaCheckbox){ selectedDemandas.push(AcolhimentoDemandas.PSICOLOGIA); }
    if(this.juridicoCheckbox){ selectedDemandas.push(AcolhimentoDemandas.JURIDICO); }
    if(this.assistenciaSocialCheckbox){ selectedDemandas.push(AcolhimentoDemandas.ASSISTENCIA_SOCIAL); }
    if(this.abrigamentosCheckbox){ selectedDemandas.push(AcolhimentoDemandas.ABRIGAMENTO); }
    this.acolhimento.demandas = selectedDemandas;

    if(this.dataNascimento){
      // Create a new Date object using the formatted date string
      const dateObject = new Date(this.dataNascimento);

      // Set the time components to zero to avoid potential time zone issues
      dateObject.setHours(0, 0, 0, 0); 

      // Convert to ISO string and store in acolhimento object
      this.acolhimento.dataNascimento = dateObject.toISOString();
    }

    if (this.acolhimentoForm.valid) { // Form fully filled
      console.info("Registering acolhimento:")
      console.info(this.acolhimento);
  
      this.apiService.updateAcolhimento(this.acolhimento)
        .then(() => { this.router.navigate(['/base-de-dados/ficha']); })
        .catch((error) => {
          console.error("Error updating acolhimento:");
          console.error(error);
          this.router.navigate(['/error']);
        });

    }else{ // Form is incomplete
      const modalRef = this.modalService.open(CadastroIncompletoComponent); // Open the pop-up
      this.saveIncompleteSubscription = modalRef.componentInstance.saveIncomplete.subscribe(() => {
        console.log("Saving incomplete form..."); 
        console.info(this.acolhimento);
        
        this.apiService.updateAcolhimento(this.acolhimento)
          .then(() => { this.router.navigate(['/base-de-dados/ficha']); })
          .catch((error) => {
            console.error("Error updating acolhimento:");
            console.error(error);
            this.router.navigate(['/error']);
          });
          
      });
    }
    
  }
}
