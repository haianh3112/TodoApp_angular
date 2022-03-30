import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.todo$;
  }

  onChangeTodoStatus(todo: Todo) {
    this.todoService.changeTodoStatus(todo);
  }

  onEditTodo(todo: Todo) {
    this.todoService.editTodo(todo);
  }

  onDeleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }
}
