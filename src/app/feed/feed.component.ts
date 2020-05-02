import { Component, OnInit } from '@angular/core';

import { TodoService } from './../services/todos.service';
import { Todos } from './../interfaces/todos.interface';
import { Comments } from './../interfaces/comments.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  todos: Todos[];
  comments: Comments[];
  error: any;
  updateTodoForm;
  id;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
    this.updateTodoForm = this.formBuilder.group({
      id: '',
      title: '',
      description: '',
      completed: '',
    });
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(
      (todos: Todos[]) => (this.todos = todos['data']),
      (error: any) => (this.error = error)
    );
  }

  onSubmitUpdate(formValue, index) {
    const todo = this.todos[index];
    try {
      this.update(
        todo.id,
        formValue.title,
        formValue.description,
        formValue.completed
      );
    } catch (error) {}

    this.updateTodoForm.reset();
  }

  postComment(description: string, index) {
    const todo = this.todos[index];
    const userId = localStorage.getItem('userId');

    this.addComment(userId, todo.id, description);

  }
  
  getComment(todoId){
    this.comments = []
    
    this.todoService.getComments(todoId).subscribe(
      (comments: Comments[]) => (this.comments = comments),
      (error: any) => (this.error = error)
    );
  }

  addComment(userId, todoId: number, description: string) {
    return this.todoService
    .createComment(userId, todoId, description)
    .subscribe( //
      (item: Comments) => (this.comments.push(item), alert('Comentado com sucesso.')),
      (error: any) => (this.error = error)
    );
  }

  update(id: number, title: string, description: string, completed: boolean) {
    return this.todoService
      .updateTodo(id, title, description, completed)
      .subscribe(
        (success: any) => alert('Atualizado com sucesso, F5 na página'),
        (error: any) => (this.error = error)
      );
  }

  delete(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      (success: any) => (
        this.todos.splice(this.todos.findIndex((item) => item.id === id)),
        alert('Excluído com sucesso.')
      ),
      (error: any) => (this.error = error)
    );
  }
}
