import {Component, Input, Output, EventEmitter} from "angular2/core";
import {Todo} from "./todo";
import {TodoService} from "./todos.service";
@Component({
    selector: 'my-todo',
    template: `
        <article class="panel panel-default">
            <div class="panel-body">
                {{todo.todo }}
            </div>
            <footer class="panel-footer">
                <div class="author">
                    Task ID: {{todo.todoId}}
                </div>
                <div class="config">
                    <!-- <a (click)="onEdit()">Edit</a> -->
                    <a (click)="onDelete()">Complete</a>
                </div>
            </footer>
        </article>
    `,
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})
export class MyTodoComponent {
    @Input() todo:Todo;

    constructor(private _todoService: TodoService) {}


    onDelete() {
        var audio = new Audio();
        audio.src = "http://localhost:3000/assets/ding.mp3";
        audio.load();
        audio.play();
        this._todoService.deleteTodo(this.todo)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
    }
}