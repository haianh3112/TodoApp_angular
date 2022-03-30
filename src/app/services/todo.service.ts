import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Filter } from '../models/filter.model';
import { Todo } from '../models/todo.model';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private static readonly todoStorageKey = 'todos';
  private API: string = environment.apiUrl;


  public todos: Todo[] = [];
  private filteredTodos: Todo[] = [];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  private currentFilter: Filter = Filter.All;

  todo$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  lengthActive$!: number;
  lengthCompleted$!: number;
  subscription!: Subscription;

  constructor(
    private storageService: LocalStorageService,
    private http: HttpClient
  ) {}

  fetchFromLocalStorage() {
    this.getTodos();
    this.todos = this.storageService.getValue(TodoService.todoStorageKey) || [];
    this.filteredTodos = [...this.todos.map((todo) => ({ ...todo }))];
    this.updateTodoData();
  }

  getTodos() {
    this.subscription = this.http.get<Todo[]>(this.API).subscribe((data) => {
      if (data) {
        this.todos = data.reverse();
        this.updateToLocalStorage();
      }
    });
  }

  private updateTodoData() {
    this.displayTodosSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }

  updateToLocalStorage() {
    this.storageService.setObject(TodoService.todoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodoData();
  }

  addTodo(title: string) {
    const newTodo = new Todo(title);
    this.subscription = this.http
      .post<Todo>(this.API, newTodo)
      .subscribe((data) => {
        this.todos.unshift(data);
        this.updateToLocalStorage();
      });
  }

  changeTodoStatus(todo: Todo) {
    this.subscription = this.http
      .put(`${this.API}/${todo.id}`, todo)
      .subscribe((data) => {
        this.updateTodo(todo);
      });
  }

  editTodo(todo: Todo) {
    this.subscription = this.http
      .put(`${this.API}/${todo.id}`, todo)
      .subscribe((data) => {
        this.updateTodo(todo);
      });
  }

  private updateTodo(todo: Todo) {
    const index = this.todos.findIndex((t) => t.id === todo.id); // tim ra todo co su thay doi trong arr todos
    const oldTodo = this.todos[index];
    oldTodo.compelete = todo.compelete;
    oldTodo.title = todo.title;
    this.todos.splice(index, 1, todo);
    this.updateToLocalStorage();
  }

  deleteTodo(id: number) {
    this.subscription = this.http
      .delete(`${this.API}/${id}`)
      .subscribe((data) => {
        const index = this.todos.findIndex((t) => t.id === id);
        this.todos.splice(index, 1);
        this.updateToLocalStorage();
      });
  }

  filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filteredTodos = this.todos.filter((todo) => !todo.compelete);
        this.lengthActive$ = this.filteredTodos.length;
        break;
      case Filter.Completed:
        this.filteredTodos = this.todos.filter((todo) => todo.compelete);
        this.lengthCompleted$ = this.filteredTodos.length;
        break;
      case Filter.All:
        this.filteredTodos = [...this.todos.map((todo) => ({ ...todo }))];
        this.lengthActive$ = this.todos.filter(
          (todo) => !todo.compelete
        ).length;
        break;
    }

    if (isFiltering) {
      this.updateTodoData();
    }
  }
}
