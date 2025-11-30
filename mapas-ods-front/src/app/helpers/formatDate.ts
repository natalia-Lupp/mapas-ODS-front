import { DatePipe } from '@angular/common';

export class DateHelper {
  private static datePipe = new DatePipe('pt-BR');

  static formatar(data: string | Date | undefined, formato: string = 'dd/MM/yyyy'): string {
    if (!data) return '';
    return this.datePipe.transform(data, formato) ?? '';
  }
}
