import {Component, Input, OnInit, EventEmitter} from 'angular2/core';
import {TodoService} from './todos.service';
import {Todo} from "./todo";
import {MyTodoComponent} from './my-todo.component';

@Component({
    selector: 'todo-list',
    template: `
         <br>
         <section class="col-md-8 col-md-offset-2">
            <br>
            <my-todo *ngFor="#todo of todos" [todo]="todo" ></my-todo>     
        </section>
    `,
    directives: [MyTodoComponent]
})
export class TodoListComponent implements OnInit {

    constructor(private _todoService: TodoService) {}

    todos: Todo[];

    ngOnInit() {
         this._todoService.getTodos()
         .subscribe(
             todos => {
                 this.todos = todos; //get back an array of todos to use. 
                 this._todoService.todos = todos; //make sure todos storage in the services is synced up for live updating
             },
                error => console.error(error)
         );
    }
}