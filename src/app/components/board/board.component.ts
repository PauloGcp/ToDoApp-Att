import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { toDoService } from 'src/app/service/to-do.service';
import {ToDoFireStoreService} from 'src/app/service/to-do-fire-store.service'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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

  constructor(private service: toDoService, private snackBar: MatSnackBar) { }

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
    const snackConfig = new MatSnackBarConfig()
    this.service.getAllTodos().subscribe(
      res => { 
        this.toDoArray = res
      },
      error => {
        snackConfig.politeness = 'assertive'
        snackConfig.duration = 2500
        snackConfig.panelClass = ['warning']
        this.snackBar.open('Não foi possível resgatar as tasks!', 'x', snackConfig)
      }
    )

  }
  createToDo() {
    const finalStepToCreate = () => {
      const snackConfig = new MatSnackBarConfig()
      this.toDoObject.description = this.currentTaskDescription
      this.service.createTodo(this.toDoObject).subscribe(
        res => {
          snackConfig.politeness = 'assertive'
          snackConfig.duration = 2500
          snackConfig.panelClass = ['success']
          this.snackBar.open('ToDo criado com sucesso!', 'x', snackConfig)
          this.executeAfterCrud()
          this.currentTaskDescription = ''
        },
        error => {
          snackConfig.politeness = 'assertive'
          snackConfig.duration = 2500
          snackConfig.panelClass = ['error']
          this.snackBar.open('Não foi possível criar o ToDo!', 'x', snackConfig)
          console.log('error', error);
          //alert('Não foi possivel criar a task.')
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
    const snackConfig = new MatSnackBarConfig()
    const finalStepToEdit = () => {
      this.toDoObject.description = this.currentTaskDescriptionToEdit
      this.service.editTodo(this.toDoObject).subscribe(
        res => {
          snackConfig.politeness = 'assertive'
          snackConfig.duration = 2500
          snackConfig.panelClass = ['success']
          this.snackBar.open('ToDo editado com sucesso!', 'x', snackConfig)
          res
        },
        error => {
          snackConfig.politeness = 'assertive'
          snackConfig.duration = 2500
          snackConfig.panelClass = ['error']
          this.snackBar.open('Não foi possível editar o ToDo!', 'x', snackConfig)
          console.log('error', error);
          //alert('Não foi possivel editar a task')
        }
      )
      this.executeAfterCrud()
    }
    this.currentTaskDescriptionToEdit.trim().length > 0 
      ? finalStepToEdit()
      : alert('É necessário inserir um texto na descrição da task.')
  }

  deleteToDo(toDo: Todo) {
    const snackConfig = new MatSnackBarConfig()
    //para o firebase passamos diretamente o id em forma de string 
    this.service.deleteTodo(toDo).subscribe(
      res => {
        snackConfig.politeness = 'assertive'
        snackConfig.duration = 2500
        snackConfig.panelClass = ['success']
        this.snackBar.open('ToDo deletado com sucesso!', 'x', snackConfig)
        this.executeAfterCrud()
      },
      error => {
        snackConfig.politeness = 'assertive'
        snackConfig.duration = 2500
        snackConfig.panelClass = ['error']
        alert('Não foi possivel deletar a task')
      }
    )
  }
  
}
