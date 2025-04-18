export interface ApiResponse {
  status: number;
  data: Array<{
    id: string;
    titulo: string;
    atualizadoEm: string;
    local: string;
  }>;
  error?: string;
}
