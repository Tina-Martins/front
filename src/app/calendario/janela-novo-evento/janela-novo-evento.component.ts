import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Evento } from 'src/models/Evento';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';
import { DateService } from 'src/services/date.service';

@Component({
  selector: 'app-janela-novo-evento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './janela-novo-evento.component.html',
  styleUrls: ['./janela-novo-evento.component.scss']
})
export class JanelaNovoEventoComponent implements OnInit {
  @Output() saveSuccess = new EventEmitter<void>();

  protected evento: Evento = {
    titulo: '',
    data: new Date().toISOString().slice(0, 10),
    diaTodo: false,
    local: '',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    regAtivo: true
  };

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private router: Router, private dateService: DateService) {}

  ngOnInit(): void {}

  protected save(): void {
    if (!this.evento.titulo || !this.evento.data || !this.evento.local) {
      return; // Prevent saving if required fields are empty
    }

    if (this.evento.diaTodo) {
      this.evento.horaInicio = undefined;
      this.evento.horaFim = undefined;
    }

    this.apiService.postEvento(this.evento)
      .then(() => {
        this.saveSuccess.emit();
        this.activeModal.close('save');
      })
      .catch(error => {
        console.error(error);
        this.router.navigate(['/error']);
      });
  }

  protected cancel(): void {
    this.activeModal.close();
  }
}