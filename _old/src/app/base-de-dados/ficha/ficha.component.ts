import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Acolhimento } from 'src/models/Acolhimento';
import { StateService } from 'src/services/state.service';
import { FichaDemandaComponent } from './abas-de-demandas/ficha-demanda/ficha-demanda.component';
import { CadastroComponent } from './abas-de-demandas/cadastro/cadastro.component';
import { AnexosComponent } from './abas-de-demandas/anexos/anexos.component';

@Component({
  selector: 'app-ficha',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FichaDemandaComponent, CadastroComponent, AnexosComponent],
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit{
  protected acolhimento: Acolhimento | undefined;
  protected isComplete: boolean | undefined;

  @ViewChild('cadastro') cadastro!: CadastroComponent;
  @ViewChild('fichaDemanda') fichaDemanda!: FichaDemandaComponent;
  @ViewChild('anexos') anexos!: AnexosComponent;

  protected isCadastroActive: boolean = true;
  protected isDemandaActive: boolean = false;
  protected isAnexosActive: boolean = false;
  
  constructor(private stateService: StateService, private cdr: ChangeDetectorRef, private router: Router) { }

  async ngOnInit() {
    this.acolhimento = this.stateService.getCurrentAcolhimento();
    this.isComplete = this.isCadastroComplete();
  }

  private isCadastroComplete(): boolean {
    const keys = Object.keys(this.acolhimento!) as (keyof Acolhimento)[];
  
    for (let key of keys) {
      if (this.acolhimento![key] === undefined) {
        return false;
      }
    }

    return true;
  }

  protected openCadastro(){
    this.isCadastroActive = true;
    this.isDemandaActive = false;
    this.isAnexosActive = false;
  }

  protected async openDemanda(demanda: string){
    try{
      await this.stateService.setCurrentAcolhimentoDemanda(demanda);
    }catch(error){
      console.error(error);
      this.router.navigate(['/error']);
    }

    this.isCadastroActive = false;
    this.isDemandaActive = false;
    this.isAnexosActive = false;
    this.cdr.detectChanges();

    this.isDemandaActive = true;
    this.cdr.detectChanges();
  }

  protected openAnexos(){
    this.isCadastroActive = false;
    this.isDemandaActive = false;
    this.isAnexosActive = true;
  }
}