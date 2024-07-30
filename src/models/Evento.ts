export interface Evento {
  id?: string;
  titulo: string;
  descricao?: string;
  data: string;
  horaInicio?: string;
  horaFim?: string;
  diaTodo: boolean;
  local: string;
  criadoEm: string;
  atualizadoEm: string;
  regAtivo: boolean;
}
