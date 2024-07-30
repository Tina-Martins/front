import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AcolhimentoDemandas, AcolhimentoStatus } from 'src/models/enums/AcolhimentoEnums';

export class SearchParams {
  public name: string = '';
  public status: AcolhimentoStatus | '' = '';
  public demanda: AcolhimentoDemandas | '' = '';
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchParamsSource = new BehaviorSubject<SearchParams>({name: '', status: '', demanda: ''});
  public searchParams$ = this.searchParamsSource.asObservable();

  public updateSearch(name: string, status: AcolhimentoStatus | '', demanda: AcolhimentoDemandas | '') {
    let searchParams: SearchParams = {name: name, status: status, demanda: demanda};
    this.searchParamsSource.next(searchParams);
  }
}
