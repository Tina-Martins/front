export interface Atendimento {
  id?: string;
  data: string;
  registro: string;
  criadoEm: string;
  criadoPor?: string;
  atualizadoEm: string;
  atualizadoPor?: string;
  excluidoEm?: string;
  excluidoPor?: string;
  regAtivo: boolean;
}
