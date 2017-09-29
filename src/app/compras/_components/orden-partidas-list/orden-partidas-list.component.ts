import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CompraDet } from 'app/models/compraDet';

@Component({
  selector: 'sx-orden-partidas-list',
  templateUrl: './orden-partidas-list.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenPartidasListComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas: CompraDet[];

  @Output() delete = new EventEmitter<number>();

  @Output() edit = new EventEmitter<number>();

  
  constructor() { }

  ngOnInit() {
    
  }

  onDelete(index){
    this.delete.emit(index);
  }
  onEdit(index) {
    this.edit.emit(index);
  }

}
