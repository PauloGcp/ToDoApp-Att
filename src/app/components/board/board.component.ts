import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { toDoService } from 'src/app/service/to-do.service';
import {ToDoFireStoreService} from 'src/app/service/to-do-fire-store.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  //faremos o bind com esses atributos para não precisar passar o nome da task através dos parametros na chamada do método
  currentTaskDescription: string = ''
  currentTaskDescriptionToEdit: string = ''
  toDoObject: Todo = new Todo()
  toDoArray: Todo[] = []

  constructor(private service: ToDoFireStoreService) { }

  ngOnInit(): void {
    this.getAllToDos();
  }

  executeAfterCrud() {
    this.toDoObject = new Todo();
    this.toDoArray = []
    this.currentTaskDescriptionToEdit = ''
    this.currentTaskDescription = ''
    this.getAllToDos();

  }
  // por não conseguir fazer o tratamento através do try/catch, fiz através do segundo parametro do subscribe (manterei o try/catch no codigo para tentar melhorar a partir desse ponto)
  getAllToDos() {
    this.service.getAllTodos().subscribe(
      res => { this.toDoArray = res },
      error => alert('Não foi possivel carregar as tasks.')
    )

  }
  createToDo() {
    const finalStepToCreate = () => {
      this.toDoObject.description = this.currentTaskDescription
      this.service.createTodo(this.toDoObject).subscribe(
        res => {
          this.executeAfterCrud()
          this.currentTaskDescription = ''
        },
        error => {
          alert('Não foi possivel criar a task.')
        }
      )
    }
    this.currentTaskDescription.trim().length > 0 
      ? finalStepToCreate()
      : alert('É necessário inserir um texto na descrição da task.')
  }

  // executa no momento de abertura do modal
  preEdit(toDo : Todo) {   
    this.toDoObject = toDo;
    this.currentTaskDescriptionToEdit = toDo.description;
  }

  editToDo() {
    const finalStepToEdit = () => {
      this.toDoObject.description = this.currentTaskDescriptionToEdit
      this.service.editTodo(this.toDoObject).subscribe(
        res => {
          this.executeAfterCrud()
        },
        error => {
          alert('Não foi possivel editar a task')
        }
      )
    }
    this.currentTaskDescriptionToEdit.trim().length > 0 
      ? finalStepToEdit()
      : alert('É necessário inserir um texto na descrição da task.')
  }

  deleteToDo(toDo: Todo) {
    this.service.deleteTodo(toDo.id+"").subscribe(
      res => {
        this.executeAfterCrud()
      },
      error => {
        alert('Não foi possivel deletar a task')
      }
    )
  }
  
}
