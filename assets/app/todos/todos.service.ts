import {Http, Headers} from "angular2/http";  
import {Injectable, EventEmitter} from "angular2/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

import {Todo} from "./todo";

@Injectable() //need to add metadata

export class TodoService { //lets get, create, delete and maybe edit our todos 
    todos: Todo[] = [];

    constructor (private _http: Http) {}; //injecting http service 

    addTodos(todo: Todo) {
        const body = JSON.stringify(todo); //turns body into a string since it can not handle an obj
        //console.log(body); 
        const headers = new Headers({'Content-Type': 'application/json'}); //let the server know it's getting json formatted data
        return this._http.post('http://localhost:3000/todo', body, {headers: headers}) //return observable
            .map(response => {
                const data = response.json().obj; //get new todo
                let todo = new Todo(data.todo, data._id);
                return todo; //add it to the array for live updating
            })
            .catch(error => Observable.throw(error.json())); //throw the extracted data in the error as a Observable
    }

    getTodos() {
        return this._http.get('http://localhost:3000/todo')
        .map(response => {
            const data = response.json().obj; //save the data from the server - data as a json obj - get obj field  (obj docs)
            // console.log(data);
            let objs: any[] =[];
            for (let i = 0; i < data.length; i++) {
                let todo = new Todo(data[i].todo, data[i]._id);
                objs.push(todo);
            };
            return objs;
        })
        .catch(error => Observable.throw(error.json())); //throw the extracted data in the error as a Observable
    }

    deleteTodo(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        return this._http.delete('http://localhost:3000/todo/' + todo.todoId)
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }
}


