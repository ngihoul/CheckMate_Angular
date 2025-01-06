import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: false,
  
  templateUrl: './form-error.component.html',
  styles: ``
})
export class FormErrorComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;

  /**
   *
   */
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.control);
  }

  ngOnChanges(changes: SimpleChanges): void { 
    console.log(this.control);
  }
}
