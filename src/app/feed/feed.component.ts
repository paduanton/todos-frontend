import { Component, OnInit } from '@angular/core';

import { TodoService } from './../services/todos.service';
import { Todos } from './../interfaces/todos.interface';

@Component({
  selector: 'app-list',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  items: Todos[];
  error: any;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(
      (items: Todos[]) => (this.items = items),
      (error: any) => (this.error = error)
    );
  }

  add(userId: number, title: string, description: string, completed: boolean) {
    this.todoService
      .createTodo(userId, title, description, completed)
      .subscribe(
        (item: Todos) => this.items.push(item),
        (error: any) => (this.error = error)
      );
  }

  delete(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      (success: any) =>
        this.items.splice(this.items.findIndex((item) => item.id === id)),
      (error: any) => (this.error = error)
    );
  }
}
