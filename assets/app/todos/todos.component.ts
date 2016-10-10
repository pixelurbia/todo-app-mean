import {Component} from 'angular2/core';
import {TodoListComponent} from './todos-list.component';
import {TodoInputComponent} from './todos-input.component';

@Component({
    selector: 'todos',
    template: `
        <todo-input></todo-input>
        <br><br>
        <todo-list></todo-list>
    `,
    styles:[`
    
    `],
    directives: [TodoListComponent,TodoInputComponent]

})

export class TodoComponent {

}

