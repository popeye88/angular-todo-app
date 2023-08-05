import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input({ required: true })
  todo!: Todo;

  @Output()
  delete = new EventEmitter();

  public editing = false;
}
