import { UsuarioEscopos } from "./enums/UsuarioEnums";

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  escopo: UsuarioEscopos;
  ultimoLogin?: string;
  criadoEm?: string;
  criadoPor?: string;
  atualizadoEm?: string;
  atualizadoPor?: string;
  excluidoEm?: string;
  excluidoPor?: string;
  regAtivo?: boolean;
}
