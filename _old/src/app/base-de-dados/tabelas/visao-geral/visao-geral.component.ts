import { Component, OnDestroy } from '@angular/core';
import { Acolhimento } from 'src/models/Acolhimento';
import { QueryOptions, QueryParam } from 'src/models/QueryOptions';
import { StateService } from 'src/services/state.service';
import { CommonModule } from '@angular/common';
import { DateService } from 'src/services/date.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/services/search.service';
import { AcolhimentoDemandas, AcolhimentoStatus } from 'src/models/enums/AcolhimentoEnums';

@Component({
  selector: 'app-visao-geral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visao-geral.component.html',
  styleUrls: ['./visao-geral.component.scss', '../tabela-base.scss']
})
export class VisaoGeralComponent implements OnDestroy{
  protected acolhimentos: Array<Acolhimento> | null = null;
  private searchSubscription: Subscription;

  constructor(
    private stateService: StateService, 
    protected dateService: DateService, 
    private router: Router, 
    private searchService: SearchService
  ) {
    this.searchSubscription = this.searchService.searchParams$.subscribe({
      next: (params) => {
        this.stateService.getAcolhimentos(params.name, params.status, params.demanda)
          .then((acolhimentos) => {
            this.acolhimentos = acolhimentos;
          })
          .catch((error) => {
            console.error(error);
            this.router.navigate(['/error']);
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  protected async openFicha(acolhimentoId: string){
    await this.stateService.setCurrentAcolhimento(acolhimentoId).catch((error) => {
      console.error(error);
      this.router.navigate(['/error']);
    });
    this.router.navigate(['base-de-dados/ficha']);
  }
}
