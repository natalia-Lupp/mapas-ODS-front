import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input({ required: true }) titleButton!: string;
  @Input() icon?: string;

  @Output() action = new EventEmitter<void>();

  handleClick() {
    this.action.emit();
  }

}
