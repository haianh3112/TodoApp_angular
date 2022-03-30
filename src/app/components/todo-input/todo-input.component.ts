import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent implements OnInit {
  todoTitle: string = '';
  nameTodo = new FormControl('');

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  onSubmit() {
    this.todoTitle = this.nameTodo.value;
    if (this.todoTitle.trim() !== '') {
      this.todoService.addTodo(this.todoTitle);
      this.nameTodo.setValue('');
    }
  }
}

