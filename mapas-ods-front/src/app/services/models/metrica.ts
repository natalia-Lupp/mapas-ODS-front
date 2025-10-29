import { InterfaceAlunosSemestres } from './alunosSemestre';
import { IntarefaceContaSanepar } from './contaSanepar';
import { InterfaceEvento } from './evento';
import { IntefaceOutros } from './outros';

export interface InterfaceMetricas {
   contas_sanepars?: IntarefaceContaSanepar[],
   eventos?: InterfaceEvento[],
   outros?: IntefaceOutros[],
   alunos_semestres?: InterfaceAlunosSemestres[],
   id_infra: string,
   peso_outro:number,
   peso_evento:number,
   peso_alunos_geral: number,
   peso_alunos_noturno: number,
   peso_alunos_integral: number,
   peso_aux_administrativos: number,
   peso_tercerizados: number,
   peso_docentes: number,
   data_inicio_periodo: Date,
   data_fim_periodo: Date
};