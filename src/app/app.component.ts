import { Component } from '@angular/core';
import { todos } from './mock-data';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from './types/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../styles/index.scss'],
})
export class AppComponent {
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
