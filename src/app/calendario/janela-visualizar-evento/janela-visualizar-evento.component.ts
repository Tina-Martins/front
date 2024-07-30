import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evento } from 'src/models/Evento';

@Component({
  selector: 'app-janela-visualizar-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './janela-visualizar-evento.component.html',
  styleUrls: ['./janela-visualizar-evento.component.scss']
})
export class JanelaVisualizarEventoComponent implements OnInit {
  @Input() evento!: Evento;

  constructor() {}

  ngOnInit(): void {}
}