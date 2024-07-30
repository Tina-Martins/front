import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Acolhimento } from 'src/models/Acolhimento';
import { Demanda } from 'src/models/Demanda';
import { AcolhimentoDemandas } from 'src/models/enums/AcolhimentoEnums';
import { ApiService } from 'src/services/api.service';
import { DateService } from 'src/services/date.service';
import { SearchService } from 'src/services/search.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-tabela-demanda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-demanda.component.html',
  styleUrls: ['./tabela-demanda.component.scss']
})
export class TabelaDemandaComponent {
  protected tipoDemanda!: AcolhimentoDemandas;

  protected acolhimentos: Array<Acolhimento> | null = null;
  private searchSubscription!: Subscription;

  protected acolhimento_demanda: Map<string, Demanda | null> | null = null;

  constructor(
    private stateService: StateService, 
    protected dateService: DateService, 
    private router: Router, 
    private searchService: SearchService,
    private apiService: ApiService
  ) {
    try{
      let tipo_demanda: AcolhimentoDemandas|undefined = this.stateService.getCurrentTipoDemanda();
      if (!tipo_demanda) { throw new Error("Tipo de demanda não definido") }
      this.tipoDemanda = tipo_demanda;

    } catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
    
    this.searchSubscription = this.searchService.searchParams$.subscribe({
      next: (params) => {
        this.stateService.getAcolhimentos(params.name, params.status, this.tipoDemanda)
          .then((acolhimentos) => this.init(acolhimentos))
          .catch((error) => {
            console.error("Error fetching acolhimentos:");
            console.error(error);
            this.router.navigate(['/error']);
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private async init(acolhimentos: Array<Acolhimento>): Promise<void> {
    this.acolhimentos = acolhimentos;
    
    this.acolhimento_demanda = new Map();
    for (let acolhimento of this.acolhimentos) {
      if (!acolhimento.id) {
        console.error("Acolhimento " + acolhimento.id + " não possui id");
        continue;
      }
      
      this.apiService.fetchDemanda(acolhimento.id, this.tipoDemanda)
        .then(demanda => {
          this.acolhimento_demanda?.set(acolhimento.id!, demanda);
        })
        .catch((error) => {
          console.error("Error fetching demanda for acolhimento " + acolhimento.id);
          console.error(error);
          this.router.navigate(['/error']);
        });
    }
  }

  protected async openFicha(acolhimentoId: string){
    await this.stateService.setCurrentAcolhimento(acolhimentoId).catch((error) => {
      console.error(error);
      this.router.navigate(['/error']);
    });

    this.router.navigate(['base-de-dados/ficha']);
  }
}
