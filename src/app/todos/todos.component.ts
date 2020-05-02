import { Component, OnInit } from '@angular/core';
import { TodoService } from './../services/todos.service';
import { Todos } from './../interfaces/todos.interface';
import { Users } from './../interfaces/users.interface';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todos[];
  user: Users;
  error: any;
  addTodoForm;

  constructor(
    private feed: FeedComponent,
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private location: Location,
    private auth: AuthService
  ) {
    this.addTodoForm = this.formBuilder.group({
      title: '',
      description: '',
      completed: '',
    });
  }

  ngOnInit(): void {
    this.todoService.getAuthenticatedUser().subscribe(
      (users: Users) => localStorage.setItem('userId', `${users.id}`),
      (error: any) => (this.error = error)
    );

    this.todoService.getAuthenticatedUser().subscribe(
      (users: Users) => (this.user = users),
      (error: any) => (this.error = error)
    );
  }

  onSubmit(todo) {
    try {
      const userId = localStorage.getItem('userId');
      this.add(userId, todo.title, todo.description, todo.completed);
    } catch (error) {
      return false;
    }

    this.addTodoForm.reset();
  }

  logout() {
    this.auth.logout();
    location.reload()
    }

  add(userId, title: string, description: string, completed: boolean) {
    return this.todoService
      .createTodo(userId, title, description, completed)
      .subscribe( //
        (item: Todos) => (this.feed.todos.push(item), alert('Cadastrado com sucesso.')),
        (error: any) => (this.error = error)
      );
  }
}
