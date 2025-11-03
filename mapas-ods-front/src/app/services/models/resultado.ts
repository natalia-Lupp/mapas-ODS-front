export interface Resultado {
   id_metrica_rb: string;
   soma_contas_sanepar: number;
   soma_eventos: number;
   soma_alunos: {
      somatoriaAlunosGeral: number;
      somatoriaAlunosIntegral: number;
      somatoriaAlunosNoturnos: number;
   };
   soma_outrs: {
      somaAuxAdministrativos: number;
      somaTercerizados: number;
      somaDocentes: number;
   };
}
