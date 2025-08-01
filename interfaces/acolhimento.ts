export interface Acolhimento {
  id: string;
  nome: string;
  demanda: string;
  status: string;
  atualizadoEm: string;
  criadoEm: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacoes?: string;
}

export interface AcolhimentoResponse {
  status: number;
  data: Acolhimento[];
  error?: string;
}
