import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/models/Usuario';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';
import { UsuarioEscopos } from 'src/models/enums/UsuarioEnums';

@Component({
  selector: 'app-janela-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './janela-editar-usuario.component.html',
  styleUrls: ['./janela-editar-usuario.component.scss']
})
export class JanelaEditarUsuarioComponent implements OnInit {
  @Input() novoUsuario: Usuario = {
    nome: '',
    email: '',
    escopo: UsuarioEscopos.ADM,
    ultimoLogin: new Date().toISOString(),
  };

  protected escopos = Object.values(UsuarioEscopos);
  protected isEditing: boolean = false;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.isEditing = !!this.novoUsuario.id; // Set isEditing based on if the user has an id
  }

  protected saveUsuario(): void {
    if (this.isEditing) {
      // Update existing user
      this.apiService.updateUsuario(this.novoUsuario)
        .then(() => {
          this.activeModal.close('save');
        })
        .catch(error => {
          console.error(error);
          this.router.navigate(['/error']);
        });
    } else {
      
      this.apiService.postUsuario(this.novoUsuario)
        .then(() => {
          this.activeModal.close('save');
        })
        .catch(error => {
          console.error(error);
          this.router.navigate(['/error']);
        });
    }
  }
}