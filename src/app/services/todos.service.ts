import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class TodoService {
  private apiRoot = environment.apiBaseUri;

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get(this.apiRoot.concat('/todos'));
  }

  createTodo(userId,title: string, description: string, completed: boolean) {

    return this.http.post(this.apiRoot.concat(`/users/${userId}/todos`), {
      title,
      description,
      completed
    });
  }

  getAuthenticatedUser() {
    return this.http.get(this.apiRoot.concat('/user'));
  }

  deleteTodo(id: number) {
    return this.http.delete(this.apiRoot.concat(`/todos/${id}`));
  }
}
