import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Pikaday from 'pikaday';

@Component({
  selector: 'app-form-conta-sanepar',
  standalone: true,
  imports: [],
  templateUrl: './form-conta-sanepar.html',
  styleUrl: './form-conta-sanepar.css'
})
export class FormContaSanepar implements AfterViewInit {
  @ViewChild('datepicker') datepickerInput!: ElementRef<HTMLInputElement>;

  picker!: Pikaday;

  ngAfterViewInit() {
    this.picker = new Pikaday({
      field: this.datepickerInput.nativeElement,
      format: 'DD/MM/YYYY'
    });
  }
}
