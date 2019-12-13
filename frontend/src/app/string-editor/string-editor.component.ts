import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPencilAlt, faCheck, faCross, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-string-editor',
  templateUrl: './string-editor.component.html',
  styleUrls: ['./string-editor.component.css']
})

export class StringEditor implements OnInit {

  iconEdit:any = faPencilAlt;
  iconSave:any = faCheck;
  iconDelete:any = faCross;
  iconAdd:any = faPlus;

  value:String;
  editing:boolean = false;

  ngOnInit() {
    this.value = this.initialValue;
  }

  @Input() initialValue:String;
  @Input() deletable:boolean = false;
  @Input() editable:boolean = false;
  @Output() onSave:any = new EventEmitter();
  @Output() onDelete:any = new EventEmitter();

  edit() {
    this.editing = true;
  }

  save() {
    this.editing = false;
    if (this.value != this.initialValue) {
      this.onSave.emit(this.value);
    }
  }

  delete() {
    this.onDelete.emit();
  }

}
