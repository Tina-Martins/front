import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/services/api.service';
import { Usuario } from 'src/models/Usuario';
import { Router } from '@angular/router';
import { DateService } from 'src/services/date.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JanelaEditarUsuarioComponent } from './janela-editar-usuario/janela-editar-usuario.component';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {
  protected usuarios: Usuario[] = [];

  constructor(private apiService: ApiService, private router: Router, protected dateService: DateService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  private fetchUsuarios(): void {
    this.apiService.fetchUsuarios()
      .then(usuarios => {
        this.usuarios = [];

        usuarios.forEach(usuario => {
          if(usuario.regAtivo) {
            this.usuarios.push(usuario);
          }
        });
      })
      .catch(error => {
        console.error(error);
        this.router.navigate(['/error']);
      });
  }

  protected abrirModalAdicionarUsuario() {
    const modalRef = this.modalService.open(JanelaEditarUsuarioComponent);
    modalRef.result.then((result) => {
      if (result === 'save') { 
        this.fetchUsuarios();
      }
    });
  }

  protected abrirModalEditarUsuario(usuario: Usuario) {
    const modalRef = this.modalService.open(JanelaEditarUsuarioComponent);
    modalRef.componentInstance.novoUsuario = { ...usuario };
    modalRef.result.then((result) => {
      if (result === 'save') {
        this.fetchUsuarios();
      }
    });
  }

  protected deletarUsuario(usuario: Usuario) {
    if (confirm(`Tem certeza que deseja deletar o usuário ${usuario.nome}?`)) {
      this.apiService.deleteUsuario(usuario.id!)
        .then(() => {
          this.fetchUsuarios();
        })
        .catch(error => {
          console.error(error);
          this.router.navigate(['/error']);
        });
    }
  }


}