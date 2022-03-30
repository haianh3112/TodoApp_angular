import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Filter, FilterButton } from 'src/app/models/filter.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterContentChecked, OnDestroy {
  filterButton: FilterButton[] = [
    { type: Filter.All, label: 'All', isActive: true },
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Completed', isActive: false },
  ];
  length = 0;
  lengthFilter!: number;
  typeTodo: any;
  destroy$: Subject<null> = new Subject<null>();
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.length$
      .pipe(takeUntil(this.destroy$))
      .subscribe((length) => {
        this.length = length;
      });

    this.filterButton.forEach((btn) => {
      this.setTypeFilterDefaultBtn(btn.type, btn.isActive);
    });
  }

  filter(type: Filter) {
    this.typeTodo = type;
    this.setActiveFilterBtn(type);
    this.todoService.filterTodos(type);
  }

  private setActiveFilterBtn(type: Filter) {
    this.filterButton.forEach((btn) => {
      btn.isActive = btn.type === type;
    });
  }

  private setTypeFilterDefaultBtn(type: any, isActive: boolean) {
    if (isActive) {
      this.typeTodo = type;
      this.todoService.filterTodos(type);
      this.lengthFilter = this.todoService.lengthActive$;
    }
  }

  ngAfterContentChecked(): void {
    switch (this.typeTodo) {
      case Filter.All:
        this.lengthFilter = this.todoService.lengthActive$;
        break;
      case Filter.Active:
        this.lengthFilter = this.todoService.lengthActive$;
        break;
      case Filter.Completed:
        this.lengthFilter = this.todoService.lengthCompleted$;
        break;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

