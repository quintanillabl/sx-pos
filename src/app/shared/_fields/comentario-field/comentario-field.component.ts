import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'sx-comentario-field',
  template: `
    <div layout="row" [formGroup]="parent" >
      <md-form-field flex>
        <textarea mdInput [formControlName]="controlName" placeholder="Comentario" #comentario cols="50" rows="2">
        </textarea>
        <md-hint align="end">{{comentario.value.length}} / {{maxLength}}</md-hint>
        <md-error>
          Longitud del comentario excedida
        </md-error>

      </md-form-field>
    </div>
  `,
  styles: []
})
export class ComentarioFieldComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() controlName = 'comentario';

  @Input() maxLength = 100;

  constructor() { }

  ngOnInit() {
  }

}
