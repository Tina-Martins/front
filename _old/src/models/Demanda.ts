import { Atendimento } from "./Atendimento";
import { AcolhimentoDemandas } from "./enums/AcolhimentoEnums";
import { DemandaStatus } from "./enums/DemandaEnums";

export interface Demanda {
  id?: string;
  tipo: AcolhimentoDemandas;
  status: DemandaStatus;
  acolhimentoId: string;
  usuarioId?: string;
  usuarioNome?: string;
  criadoEm?: string;
  atualizadoEm?: string;
  criadoPor?: string;
  atualizadoPor?: string;
  excluidoEm?: string;
  excluidoPor?: string;
  regAtivo?: boolean;
  atendimentos?: Atendimento[];
}
