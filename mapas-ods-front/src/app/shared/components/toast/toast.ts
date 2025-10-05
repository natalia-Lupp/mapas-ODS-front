import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoAlerta } from './toast.enum';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.css']
})
export class Toast {
  @Input({ required: true }) mensagem!: string;

  // Tipo de alerta: 'alert-info', 'alert-success', 'alert-error'...
  @Input({ required: true }) tipoAlerta!: TipoAlerta;

  @Input() show = true;
}
