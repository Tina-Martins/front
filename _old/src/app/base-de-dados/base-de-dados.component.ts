import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AcolhimentoDemandas, AcolhimentoStatus } from 'src/models/enums/AcolhimentoEnums';
import { FormsModule } from '@angular/forms';
import { SearchService } from 'src/services/search.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-base-de-dados',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './base-de-dados.component.html',
  styleUrls: ['./base-de-dados.component.scss']
})
export class BaseDeDadosComponent {
  protected searchName: string = '';
  protected searchStatus: AcolhimentoStatus | '' = '';
  protected searchDemanda: AcolhimentoDemandas | '' = '';

  protected acolhimentoStatus = Object.values(AcolhimentoStatus);
  protected acolhimentoDemandas = Object.values(AcolhimentoDemandas);

  constructor(private searchService: SearchService, private stateService: StateService, private router: Router) {}

  protected updateSearch() {
    this.searchService.updateSearch(this.searchName, this.searchStatus, this.searchDemanda);
  }

  protected openPsicologiaTable(){    
    try{
      this.stateService.setCurrentTipoDemanda(AcolhimentoDemandas.PSICOLOGIA);
      this.router.navigate(['base-de-dados/psicologia']);
    }catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
  }

  protected openJuridicoTable(){
    try{
      this.stateService.setCurrentTipoDemanda(AcolhimentoDemandas.JURIDICO);
      this.router.navigate(['base-de-dados/juridico']);
    } catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
  }

  protected openServicoSocialTable(){
    try{
      this.stateService.setCurrentTipoDemanda(AcolhimentoDemandas.ASSISTENCIA_SOCIAL);
      this.router.navigate(['base-de-dados/servico-social']);
    } catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
  }

  protected openAbrigamentosTable(){
    try{
      this.stateService.setCurrentTipoDemanda(AcolhimentoDemandas.ABRIGAMENTO);
      this.router.navigate(['base-de-dados/abrigamentos']);
    } catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }
  }
  
}
