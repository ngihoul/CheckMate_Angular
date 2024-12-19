import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: false,
  
  templateUrl: './form-error.component.html',
  styles: ``
})
export class FormErrorComponent {
  @Input({ required: true }) control!: AbstractControl<any> | null;
}
