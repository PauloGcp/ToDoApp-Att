
import { Injectable, InjectionToken  } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Todo } from '../model/todo';
import {from, map, Observable} from 'rxjs';

export const FIREBASE_OPTIONS = new InjectionToken<any>('angularfire2.app.options');
@Injectable({
  providedIn: 'root'
})

export class ToDoFireStoreService {
  colecaoTodos: AngularFirestoreCollection<Todo>;
  NOME_COLECAO = 'tasks';

  constructor(private afs: AngularFirestore) {
    this.colecaoTodos = afs.collection(this.NOME_COLECAO);
  }


  getAllTodos(): Observable<Todo[]> {
    // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
    return this.colecaoTodos.valueChanges({idField: 'id'});
  }


  createTodo(todo: Todo): Observable<object> {
    // removendo id pois ele está undefined, já que um novo usuário
    delete todo.id;
    // Object.assign({}, usuario) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
    // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
    return from(this.colecaoTodos.add({...todo}));
  }


  deleteTodo(id: string): Observable<void> {
    return from(this.colecaoTodos.doc(id).delete());
  }

  editTodo(todo: Todo): Observable<void> {
    // removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento
    delete todo.id;
    return from(this.colecaoTodos.doc(todo.id).update({...todo}));
  }

}
