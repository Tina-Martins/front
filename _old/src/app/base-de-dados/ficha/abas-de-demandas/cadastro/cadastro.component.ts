import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Acolhimento } from 'src/models/Acolhimento';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/services/state.service';
import { DateService } from 'src/services/date.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  protected acolhimento: Acolhimento | undefined;

  constructor(private router: Router, private acolhimentoService: StateService, protected dateService: DateService) { }

  ngOnInit() {
    this.acolhimento = this.acolhimentoService.getCurrentAcolhimento();
  }
}
