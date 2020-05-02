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

  createTodo(userId, title: string, description: string, completed: boolean) {
    return this.http.post(this.apiRoot.concat(`/users/${userId}/todos`), {
      title,
      description,
      completed,
    });
  }

  getAuthenticatedUser() {
    return this.http.get(this.apiRoot.concat('/user'));
  }

  getUserById(id: number) {
    return this.http.get(this.apiRoot.concat(`/user/${id}`));
  }

  getComments(todoId: number) {
    return this.http.get(this.apiRoot.concat(`/todos/${todoId}/comments`));
  }

  createComment(userId: number, todoId: number, description: string) {
    return this.http.post(
      this.apiRoot.concat(`/users/${userId}/todos/${todoId}/comments`),
      {
        description,
      }
    );
  }

  updateTodo(
    id: number,
    title: string,
    description: string,
    completed: boolean
  ) {
    return this.http.put(this.apiRoot.concat(`/todos/${id}`), {
      title,
      description,
      completed,
    });
  }

  deleteTodo(id: number) {
    return this.http.delete(this.apiRoot.concat(`/todos/${id}`));
  }
}
