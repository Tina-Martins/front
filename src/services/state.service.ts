import { Inject, Injectable } from '@angular/core';
import { Acolhimento } from 'src/models/Acolhimento';
import { QueryOptions, QueryParam } from 'src/models/QueryOptions';
import { ApiService } from './api.service';
import { AcolhimentoDemandas, AcolhimentoStatus } from 'src/models/enums/AcolhimentoEnums';
import { Router } from '@angular/router';
import { Demanda } from 'src/models/Demanda';
import { Atendimento } from 'src/models/Atendimento';
 
@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentAcolhimento: Acolhimento | undefined;
  private currentTipoDemanda: AcolhimentoDemandas | undefined;
  private currentAcolhimentoDemanda: Demanda | undefined;
  private currentAtendimento: Atendimento | undefined;

  private lastDocRef: string | null = null;

  constructor(private apiService: ApiService, private router: Router ) { 
    // Load from session storage on initialization
    const storedAcolhimento = sessionStorage.getItem('currentAcolhimento');
    if (storedAcolhimento) { this.currentAcolhimento = JSON.parse(storedAcolhimento); }

    const storedTipoDemanda = sessionStorage.getItem('currentTipoDemanda');
    if (storedTipoDemanda) { this.currentTipoDemanda = JSON.parse(storedTipoDemanda); }

    const storedAcolhimentoDemanda = sessionStorage.getItem('currentAcolhimentoDemanda');
    if (storedAcolhimentoDemanda) { this.currentAcolhimentoDemanda = JSON.parse(storedAcolhimentoDemanda); }

    const storedAtendimento = sessionStorage.getItem('currentAtendimento');
    if (storedAtendimento) { this.currentAtendimento = JSON.parse(storedAtendimento); }
  }

  public async setCurrentAcolhimento(id: string): Promise<void>{
    let result = await this.apiService.getAcolhimentoById(id);
    this.currentAcolhimento = result;
    
    sessionStorage.setItem('currentAcolhimento', JSON.stringify(this.currentAcolhimento)) // Save to session storage
  }

  public async getAcolhimentos(searchName: string, searchStatus: string | '', searchDemanda: string | ''): Promise<Array<Acolhimento>> {
    let queryOptions: QueryOptions = {};
    let queryParams: QueryParam[] = [];

    if (searchName) {
      queryParams.push({ field: 'nome', operator: '==', value: searchName });
    }

    if (searchStatus) {
      queryParams.push({ field: 'status', operator: '==', value: searchStatus });
    }

    if (searchDemanda) {
      queryParams.push({ field: 'demandas', operator: 'array-contains', value: searchDemanda });
    }

    if (queryParams.length > 0) {
      queryOptions.filters = queryParams;
    }

    let result = await this.apiService.fetchAcolhimentos(queryOptions);

    console.info("Sucessfully fetched " + result.data.length + " acolhimentos:");
    console.info(result.data);

    return result.data;
  }

  public async getAcolhimentoById(id: string){
    
  }

  public getCurrentAcolhimento(): Acolhimento | undefined { return this.currentAcolhimento; }  

  public setCurrentTipoDemanda(tipo: AcolhimentoDemandas): void {
    this.currentTipoDemanda = tipo;

    sessionStorage.setItem('currentTipoDemanda', JSON.stringify(this.currentTipoDemanda));
  }

  public async setCurrentAcolhimentoDemanda(tipo: string): Promise<void> {
    if(!this.currentAcolhimento){
      throw new Error("Current Acolhimento not set!");
    }
    let result = await this.apiService.fetchDemanda(this.currentAcolhimento.id!, tipo);
    if(!result){
      throw new Error("Demanda not found!");
    }

    this.currentAcolhimentoDemanda = result;
    sessionStorage.setItem('currentAcolhimentoDemanda', JSON.stringify(this.currentAcolhimentoDemanda));

    this.setCurrentTipoDemanda(result.tipo);
  }

  public getCurrentTipoDemanda(): AcolhimentoDemandas | undefined { return this.currentTipoDemanda; }
  public getCurrentAcolhimentoDemanda(): Demanda | undefined { return this.currentAcolhimentoDemanda; }

  public setCurrentAtendimento(atendimento: Atendimento): void { 
    this.currentAtendimento = atendimento; 
    sessionStorage.setItem('currentAtendimento', JSON.stringify(atendimento));
  }
  public getCurrentAtendimento(): Atendimento | undefined { return this.currentAtendimento; }
}
