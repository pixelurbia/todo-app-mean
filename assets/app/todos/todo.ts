export class Todo {
    todo: string;
    todoId: string;

    constructor (todo: string, todoId?: string) {
        this.todo = todo;
        this.todoId = todoId;
    }
}