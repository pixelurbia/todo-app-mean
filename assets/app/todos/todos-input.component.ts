import {Component, Input} from 'angular2/core';

import {Todo} from "./todo";
import {TodoService} from './todos.service';


@Component({
    selector: 'todo-input',
    template: `
     <section class="col-md-8 col-md-offset-2">
            <form (ngSubmit)="onSubmit(f.value)" #f="ngForm">
                <div class="form-group">

                    <input ngControl="todo" type="text" class="form-control" id="todo" #inpu placeholder="Add a new todo item."t>
                </div>
                <button type="submit" class="btn btn-primary">Add Todo</button>
            </form>
        </section>
    `
    
})

export class TodoInputComponent {
        todo: Todo = null;    
   
    constructor(private _todoService: TodoService){}

      onSubmit(form:any) {
        const todo:Todo = new Todo(form.todo);
        //  console.log(todo);
        this._todoService.addTodos(todo)
        .subscribe(
                data => {
                    this._todoService.todos.push(data); //pushing data to the todoService array state
                           console.log(data);
                           console.log('It got this far.');
                },
                error => console.error(error)

            );  


    }; //send the todo



