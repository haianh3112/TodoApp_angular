import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo | any;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  faEdit = faEdit;
  faTrash = faTrash;
  isEditing = false;

  constructor() {}

  ngOnInit(): void {
  }

  changeTodoStatus() {
    this.changeStatus.emit({
      ...this.todo,
      complete: !this.todo.complete,
    });
  }

  submitEdit(event: KeyboardEvent) {
    const { keyCode } = event;
    event.preventDefault();
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  removeTodo() {
    this.deleteTodo.emit(this.todo);
  }

}
