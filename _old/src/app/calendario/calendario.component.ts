import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/services/api.service';
import { Evento } from 'src/models/Evento';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JanelaNovoEventoComponent } from './janela-novo-evento/janela-novo-evento.component';
import { JanelaVisualizarEventoComponent } from './janela-visualizar-evento/janela-visualizar-evento.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit{
  protected currentMonth: number = new Date().getMonth();
  protected currentYear: number = new Date().getFullYear();
  protected calendarDays: { date: number, events: Evento[] }[][] = [];
  protected eventos: Evento[] = [];

  constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal){}

  ngOnInit(): void {
    this.fetchEventos();
    this.generateCalendar();
  }

  private fetchEventos(): void {
    this.apiService.fetchEventos()
      .then(eventos => {
        this.eventos = eventos;
        this.generateCalendar(); // Regenerate calendar after fetching events
      })
      .catch(error => {
        console.error(error);
        this.router.navigate(['/error']);
      });
  }

  private generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = (new Date(this.currentYear, this.currentMonth)).getDay();
    const daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      this.calendarDays[i] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          this.calendarDays[i][j] = { date: 0, events: [] };
        } else if (date > daysInMonth) {
          break;
        } else {
          this.calendarDays[i][j] = { date: date, events: this.getEventsForDate(date) };
          date++;
        }
      }
    }
  }

  private getEventsForDate(date: number): Evento[] {
    const dateString = `${this.currentYear}-${(this.currentMonth + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    return this.eventos.filter(evento => evento.data === dateString);
  }

  protected previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  protected nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  protected openNovoEventoModal(): void {
    const modalRef = this.modalService.open(JanelaNovoEventoComponent);
    modalRef.result.then((result) => {
      if (result === 'save') {
        this.fetchEventos(); // Refresh events after saving a new one
      }
    });
  }

  protected openVisualizarEventoModal(evento: Evento): void {
    const modalRef = this.modalService.open(JanelaVisualizarEventoComponent);
    modalRef.componentInstance.evento = evento; // Pass the event to the modal
  }
}