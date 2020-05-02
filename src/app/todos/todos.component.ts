import { Component, OnInit } from '@angular/core';
import { TodoService } from './../services/todos.service';
import { Todos } from './../interfaces/todos.interface';
import { Users } from './../interfaces/users.interface';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

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
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private location: Location
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

  add(userId, title: string, description: string, completed: boolean) {
    return this.todoService
      .createTodo(userId, title, description, completed)
      .subscribe(
        (item: Todos) => alert('Cadastrado com sucesso. Por favor, atualize a página.'),
        (error: any) => (this.error = error)
      );
  }
}
