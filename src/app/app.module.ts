import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodosListComponent,
    TodoInputComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ TodoService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
