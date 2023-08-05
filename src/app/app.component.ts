import { Component, OnInit } from '@angular/core';
import { todos } from './mock-data';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from './types/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../styles/index.scss'],
})
export class AppComponent implements OnInit {
  public todos: Todo[] = todos;
  public todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    })
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }
  get activeTodos(): Todo[] {
    return this.todos.filter((todo) => !todo.completed);
  }

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.todos[1] = {...this.todos[1], title: 'qwerty'};
    }, 3000);
  }

  trackById(i: number, todo: Todo): number {
    return todo.id;
  }

  // handleTodoToggle(event: Event, todo: Todo): void {
  //   todo.completed = (event.target as HTMLInputElement).checked;
  //   console.log(event);
  // }

  addTodo(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.title.value,
      completed: false
    }

    this.todos.push(newTodo);
    this.todoForm.reset();
  }
}
