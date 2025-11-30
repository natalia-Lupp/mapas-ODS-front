import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const initial = event.target.value;
    event.target.value = initial.replace(/[^0-9]/g, '');
  }
}
