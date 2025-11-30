import { InterfaceAlunosSemestres } from './alunosSemestre';
import { IntarefaceContaSanepar } from './contaSanepar';
import { IntefaceOutros } from './outros';

export interface InterfaceMetricas {
   id?:string,
   nome_customizado: string,
   contas_sanepars?: IntarefaceContaSanepar[],
   eventos?: string[],
   outros?: IntefaceOutros[],
   alunos_semestres?: InterfaceAlunosSemestres[],
   id_infra: string,
   data_inicio_periodo: Date,
   data_fim_periodo: Date,
   consumo_total_agua: number,
   total_pessoas_eventos?: number,
   total_auxiliares_administrativos?: number,
   total_tercerizados?: number,
   total_docentes?: number,
   total_alunos_geral?: number,
   total_alunos_integral?: number,
   total_alunos_noturnos?: number
   litros_por_total_pessoas_eventos?: number,
   litros_por_total_auxiliares_administrativos?: number,
   litros_por_total_tercerizados?: number,
   litros_por_total_docentes?: number,
   litros_por_total_alunos_geral?: number,
   litros_por_total_alunos_integral?: number,
   litros_por_total_alunos_noturnos?: number
};