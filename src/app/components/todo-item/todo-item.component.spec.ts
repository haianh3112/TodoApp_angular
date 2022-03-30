import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Todo } from 'src/app/models/todo.model';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      imports: [
        FontAwesomeModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check value for complete', () => {

    expect(component.todo.complete).toBeTruthy()
  })

});

