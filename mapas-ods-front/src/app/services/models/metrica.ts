import { InterfaceAlunosSemestres } from "./alunosSemestre";
import { IntarefaceContaSanepar } from "./contaSanepar";
import { InterfaceEvento } from "./evento";
import { InterfaceInfraestrutura } from "./infraestrutura";
import { IntefaceOutros } from "./outros";

export interface InterfaceMetricas {
   contas_sanepars?: IntarefaceContaSanepar[],
   eventos?: InterfaceEvento[],
   outros?: IntefaceOutros[],
   alunos_semestres?: InterfaceAlunosSemestres[],
   id_infra:string,
   valores_pesos:number[],
};