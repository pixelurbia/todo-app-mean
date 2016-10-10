import {Component} from 'angular2/core';
import {TodoComponent} from './todos/todos.component';

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
        <todos></todos>
        </div>
    `,
    directives: [TodoComponent]
})


export class AppComponent  {  


}