import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  title= 'Todo App';

  hasTodo$!: Observable<boolean>;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.fetchFromLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map((length) => length > 0));
  }

  ngOnDestroy() {
    if (this.todoService.subscription) {
      this.todoService.subscription.unsubscribe();
    }
  }
}
