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
   data_inicio_periodo: Date,
   data_fim_periodo: Date,
   consumo_total_agua: number,
   total_pessoas_eventos: number,
   total_auxiliares_administrativos: number,
   total_tercerizados: number,
   total_docentes: number,
   total_alunos_geral: number,
   total_alunos_integral: number,
   total_alunos_noturnos: number
};