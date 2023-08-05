import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnChanges {
  @Input({ required: true })
  todo!: Todo;

  @Output()
  delete = new EventEmitter();

  @ViewChild('titleFocus')
  set titleFocus(field: ElementRef) {
    if(field) {
      field.nativeElement.focus();
    }
  };

  public title = '';
  public editing = false;

  constructor() {}
  ngOnChanges({ todo }: SimpleChanges): void {
    console.log(todo.previousValue);

    if(todo.currentValue.title !== todo.previousValue?.title) {
      this.title = todo.currentValue.title;
    }
  }
  
  edit(): void {
    this.editing = true;
    this.title = this.todo.title;
  }

  save(): void {
    if(!this.editing) {
      return;
    }
    this.editing = false;
    this.todo.title = this.title;
  }
}
