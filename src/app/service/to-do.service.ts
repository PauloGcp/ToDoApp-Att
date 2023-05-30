import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class toDoService {
  
  serviceURL: string = "http://localhost:3000/tasks"

  constructor(private http: HttpClient) {
  }
  
  //Create
  createTodo(todo: Todo) : Observable<Todo> {
    return this.http.post<Todo>(this.serviceURL, todo)
  }
  //Read
  getAllTodos() : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.serviceURL)
  }
  //Update
  editTodo(todo: Todo) : Observable<Todo> {
    return this.http.put<Todo>(`${this.serviceURL}/${todo.id}`, todo)
  }
  //Delete
  deleteTodo(todo: Todo) : Observable<Todo> {
    return this.http.delete<Todo>(`${this.serviceURL}/${todo.id}`)
  }
}
