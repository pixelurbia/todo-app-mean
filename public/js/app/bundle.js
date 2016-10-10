var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("todos/todo", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Todo;
    return {
        setters:[],
        execute: function() {
            Todo = (function () {
                function Todo(todo, todoId) {
                    this.todo = todo;
                    this.todoId = todoId;
                }
                return Todo;
            }());
            exports_1("Todo", Todo);
        }
    }
});
System.register("todos/todos.service", ["angular2/http", "angular2/core", 'rxjs/Rx', "rxjs/Observable", "todos/todo"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var http_1, core_1, Observable_1, todo_1;
    var TodoService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (todo_1_1) {
                todo_1 = todo_1_1;
            }],
        execute: function() {
            TodoService = (function () {
                function TodoService(_http) {
                    this._http = _http;
                    this.todos = [];
                }
                ;
                TodoService.prototype.addTodos = function (todo) {
                    var body = JSON.stringify(todo); //turns body into a string since it can not handle an obj
                    //console.log(body); 
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); //let the server know it's getting json formatted data
                    return this._http.post('http://localhost:3000/todo', body, { headers: headers }) //return observable
                        .map(function (response) {
                        var data = response.json().obj; //get new todo
                        var todo = new todo_1.Todo(data.todo, data._id);
                        return todo; //add it to the array for live updating
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); }); //throw the extracted data in the error as a Observable
                };
                TodoService.prototype.getTodos = function () {
                    return this._http.get('http://localhost:3000/todo')
                        .map(function (response) {
                        var data = response.json().obj; //save the data from the server - data as a json obj - get obj field  (obj docs)
                        // console.log(data);
                        var objs = [];
                        for (var i = 0; i < data.length; i++) {
                            var todo = new todo_1.Todo(data[i].todo, data[i]._id);
                            objs.push(todo);
                        }
                        ;
                        return objs;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); }); //throw the extracted data in the error as a Observable
                };
                TodoService.prototype.deleteTodo = function (todo) {
                    this.todos.splice(this.todos.indexOf(todo), 1);
                    return this._http.delete('http://localhost:3000/todo/' + todo.todoId)
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                TodoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TodoService);
                return TodoService;
            }());
            exports_2("TodoService", TodoService);
        }
    }
});
System.register("todos/my-todo.component", ["angular2/core", "todos/todo", "todos/todos.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, todo_2, todos_service_1;
    var MyTodoComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (todo_2_1) {
                todo_2 = todo_2_1;
            },
            function (todos_service_1_1) {
                todos_service_1 = todos_service_1_1;
            }],
        execute: function() {
            MyTodoComponent = (function () {
                function MyTodoComponent(_todoService) {
                    this._todoService = _todoService;
                }
                MyTodoComponent.prototype.onDelete = function () {
                    var audio = new Audio();
                    audio.src = "http://localhost:3000/assets/ding.mp3";
                    audio.load();
                    audio.play();
                    this._todoService.deleteTodo(this.todo)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', todo_2.Todo)
                ], MyTodoComponent.prototype, "todo", void 0);
                MyTodoComponent = __decorate([
                    core_2.Component({
                        selector: 'my-todo',
                        template: "\n        <article class=\"panel panel-default\">\n            <div class=\"panel-body\">\n                {{todo.todo }}\n            </div>\n            <footer class=\"panel-footer\">\n                <div class=\"author\">\n                    Task ID: {{todo.todoId}}\n                </div>\n                <div class=\"config\">\n                    <!-- <a (click)=\"onEdit()\">Edit</a> -->\n                    <a (click)=\"onDelete()\">Complete</a>\n                </div>\n            </footer>\n        </article>\n    ",
                        styles: ["\n        .author {\n            display: inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n        }\n        .config {\n            display: inline-block;\n            text-align: right;\n            font-size: 12px;\n            width: 19%;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [todos_service_1.TodoService])
                ], MyTodoComponent);
                return MyTodoComponent;
            }());
            exports_3("MyTodoComponent", MyTodoComponent);
        }
    }
});
System.register("todos/todos-list.component", ['angular2/core', "todos/todos.service", "todos/my-todo.component"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, todos_service_2, my_todo_component_1;
    var TodoListComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (todos_service_2_1) {
                todos_service_2 = todos_service_2_1;
            },
            function (my_todo_component_1_1) {
                my_todo_component_1 = my_todo_component_1_1;
            }],
        execute: function() {
            TodoListComponent = (function () {
                function TodoListComponent(_todoService) {
                    this._todoService = _todoService;
                }
                TodoListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._todoService.getTodos()
                        .subscribe(function (todos) {
                        _this.todos = todos; //get back an array of todos to use. 
                        _this._todoService.todos = todos; //make sure todos storage in the services is synced up for live updating
                    }, function (error) { return console.error(error); });
                };
                TodoListComponent = __decorate([
                    core_3.Component({
                        selector: 'todo-list',
                        template: "\n         <br>\n         <section class=\"col-md-8 col-md-offset-2\">\n            <br>\n            <my-todo *ngFor=\"#todo of todos\" [todo]=\"todo\" ></my-todo>     \n        </section>\n    ",
                        directives: [my_todo_component_1.MyTodoComponent]
                    }), 
                    __metadata('design:paramtypes', [todos_service_2.TodoService])
                ], TodoListComponent);
                return TodoListComponent;
            }());
            exports_4("TodoListComponent", TodoListComponent);
        }
    }
});
System.register("todos/todos-input.component", ['angular2/core', "todos/todo", "todos/todos.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_4, todo_3, todos_service_3;
    var TodoInputComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (todo_3_1) {
                todo_3 = todo_3_1;
            },
            function (todos_service_3_1) {
                todos_service_3 = todos_service_3_1;
            }],
        execute: function() {
            TodoInputComponent = (function () {
                function TodoInputComponent(_todoService) {
                    this._todoService = _todoService;
                    this.todo = null;
                }
                TodoInputComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    var todo = new todo_3.Todo(form.todo);
                    //  console.log(todo);
                    this._todoService.addTodos(todo)
                        .subscribe(function (data) {
                        _this._todoService.todos.push(data); //pushing data to the todoService array state
                        console.log(data);
                        console.log('It got this far.');
                    }, function (error) { return console.error(error); });
                };
                ;
                TodoInputComponent = __decorate([
                    core_4.Component({
                        selector: 'todo-input',
                        template: "\n     <section class=\"col-md-8 col-md-offset-2\">\n            <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n                <div class=\"form-group\">\n\n                    <input ngControl=\"todo\" type=\"text\" class=\"form-control\" id=\"todo\" #inpu placeholder=\"Add a new todo item.\"t>\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\">Add Todo</button>\n            </form>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [todos_service_3.TodoService])
                ], TodoInputComponent);
                return TodoInputComponent;
            }());
            exports_5("TodoInputComponent", TodoInputComponent); //send the todo
        }
    }
});
System.register("todos/todos.component", ['angular2/core', "todos/todos-list.component", "todos/todos-input.component"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_5, todos_list_component_1, todos_input_component_1;
    var TodoComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (todos_list_component_1_1) {
                todos_list_component_1 = todos_list_component_1_1;
            },
            function (todos_input_component_1_1) {
                todos_input_component_1 = todos_input_component_1_1;
            }],
        execute: function() {
            TodoComponent = (function () {
                function TodoComponent() {
                }
                TodoComponent = __decorate([
                    core_5.Component({
                        selector: 'todos',
                        template: "\n        <todo-input></todo-input>\n        <br><br>\n        <todo-list></todo-list>\n    ",
                        styles: ["\n    \n    "],
                        directives: [todos_list_component_1.TodoListComponent, todos_input_component_1.TodoInputComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TodoComponent);
                return TodoComponent;
            }());
            exports_6("TodoComponent", TodoComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "todos/todos.component"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_6, todos_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (todos_component_1_1) {
                todos_component_1 = todos_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_6.Component({
                        selector: 'my-app',
                        template: "\n        <div class=\"container\">\n        <todos></todos>\n        </div>\n    ",
                        directives: [todos_component_1.TodoComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_7("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "todos/todos.service", "angular2/router", "angular2/core", "angular2/http"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var browser_1, app_component_1, todos_service_4, router_1, core_7, http_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (todos_service_4_1) {
                todos_service_4 = todos_service_4_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [todos_service_4.TodoService, router_1.ROUTER_PROVIDERS, core_7.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }), http_2.HTTP_PROVIDERS]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG9zL3RvZG8udHMiLCJ0b2Rvcy90b2Rvcy5zZXJ2aWNlLnRzIiwidG9kb3MvbXktdG9kby5jb21wb25lbnQudHMiLCJ0b2Rvcy90b2Rvcy1saXN0LmNvbXBvbmVudC50cyIsInRvZG9zL3RvZG9zLWlucHV0LmNvbXBvbmVudC50cyIsInRvZG9zL3RvZG9zLmNvbXBvbmVudC50cyIsImFwcC5jb21wb25lbnQudHMiLCJib290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBQTtnQkFJSSxjQUFhLElBQVksRUFBRSxNQUFlO29CQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQ0wsV0FBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBUkQsdUJBUUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ0NEO2dCQUdJLHFCQUFxQixLQUFXO29CQUFYLFVBQUssR0FBTCxLQUFLLENBQU07b0JBRmhDLFVBQUssR0FBVyxFQUFFLENBQUM7Z0JBRWdCLENBQUM7O2dCQUVwQyw4QkFBUSxHQUFSLFVBQVMsSUFBVTtvQkFDZixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseURBQXlEO29CQUM1RixxQkFBcUI7b0JBQ3JCLElBQU0sT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtvQkFDekgsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLG1CQUFtQjt5QkFDN0YsR0FBRyxDQUFDLFVBQUEsUUFBUTt3QkFDVCxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFB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QSxBQUVDLElBQUE7WUFGRCx5Q0FFQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNORDtnQkFBQTtnQkFHQSxDQUFDO2dCQWREO29CQUFDLGdCQUFTLENBQUM7d0JBQ1AsUUFBUSxFQUFFLFFBQVE7d0JBQ2xCLFFBQVEsRUFBRSxvRkFJVDt3QkFDRCxVQUFVLEVBQUUsQ0FBQywrQkFBYSxDQUFDO3FCQUM5QixDQUFDOztnQ0FBQTtnQkFNRixtQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsdUNBR0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNSRCxtQkFBUyxDQUFDLDRCQUFZLEVBQUUsQ0FBQywyQkFBVyxFQUFFLHlCQUFnQixFQUFFLGNBQU8sQ0FBQyx5QkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxDQUFDLEVBQUUscUJBQWMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiLi4vLi4vLi4vdG9kb3MvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRvZG8ge1xuICAgIHRvZG86IHN0cmluZztcbiAgICB0b2RvSWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yICh0b2RvOiBzdHJpbmcsIHRvZG9JZD86IHN0cmluZykge1xuICAgICAgICB0aGlzLnRvZG8gPSB0b2RvO1xuICAgICAgICB0aGlzLnRvZG9JZCA9IHRvZG9JZDtcbiAgICB9XG59IiwiaW1wb3J0IHtIdHRwLCBIZWFkZXJzfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiOyAgXG5pbXBvcnQge0luamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCAncnhqcy9SeCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuaW1wb3J0IHtUb2RvfSBmcm9tIFwiLi90b2RvXCI7XG5cbkBJbmplY3RhYmxlKCkgLy9uZWVkIHRvIGFkZCBtZXRhZGF0YVxuXG5leHBvcnQgY2xhc3MgVG9kb1NlcnZpY2UgeyAvL2xldHMgZ2V0LCBjcmVhdGUsIGRlbGV0ZSBhbmQgbWF5YmUgZWRpdCBvdXIgdG9kb3MgXG4gICAgdG9kb3M6IFRvZG9bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9OyAvL2luamVjdGluZyBodHRwIHNlcnZpY2UgXG5cbiAgICBhZGRUb2Rvcyh0b2RvOiBUb2RvKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh0b2RvKTsgLy90dXJucyBib2R5IGludG8gYSBzdHJpbmcgc2luY2UgaXQgY2FuIG5vdCBoYW5kbGUgYW4gb2JqXG4gICAgICAgIC8vY29uc29sZS5sb2coYm9keSk7IFxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTsgLy9sZXQgdGhlIHNlcnZlciBrbm93IGl0J3MgZ2V0dGluZyBqc29uIGZvcm1hdHRlZCBkYXRhXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC90b2RvJywgYm9keSwge2hlYWRlcnM6IGhlYWRlcnN9KSAvL3JldHVybiBvYnNlcnZhYmxlXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajsgLy9nZXQgbmV3IHRvZG9cbiAgICAgICAgICAgICAgICBsZXQgdG9kbyA9IG5ldyBUb2RvKGRhdGEudG9kbywgZGF0YS5faWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2RvOyAvL2FkZCBpdCB0byB0aGUgYXJyYXkgZm9yIGxpdmUgdXBkYXRpbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTsgLy90aHJvdyB0aGUgZXh0cmFjdGVkIGRhdGEgaW4gdGhlIGVycm9yIGFzIGEgT2JzZXJ2YWJsZVxuICAgIH1cblxuICAgIGdldFRvZG9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC90b2RvJylcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajsgLy9zYXZlIHRoZSBkYXRhIGZyb20gdGhlIHNlcnZlciAtIGRhdGEgYXMgYSBqc29uIG9iaiAtIGdldCBvYmogZmllbGQgIChvYmogZG9jcylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgbGV0IG9ianM6IGFueVtdID1bXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0b2RvID0gbmV3IFRvZG8oZGF0YVtpXS50b2RvLCBkYXRhW2ldLl9pZCk7XG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKHRvZG8pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBvYmpzO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTsgLy90aHJvdyB0aGUgZXh0cmFjdGVkIGRhdGEgaW4gdGhlIGVycm9yIGFzIGEgT2JzZXJ2YWJsZVxuICAgIH1cblxuICAgIGRlbGV0ZVRvZG8odG9kbzogVG9kbykge1xuICAgICAgICB0aGlzLnRvZG9zLnNwbGljZSh0aGlzLnRvZG9zLmluZGV4T2YodG9kbyksIDEpO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5kZWxldGUoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC90b2RvLycgKyB0b2RvLnRvZG9JZClcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XG4gICAgfVxufVxuXG5cbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1RvZG99IGZyb20gXCIuL3RvZG9cIjtcbmltcG9ydCB7VG9kb1NlcnZpY2V9IGZyb20gXCIuL3RvZG9zLnNlcnZpY2VcIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktdG9kbycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIHt7dG9kby50b2RvIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIFRhc2sgSUQ6IHt7dG9kby50b2RvSWR9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWdcIj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSA8YSAoY2xpY2spPVwib25FZGl0KClcIj5FZGl0PC9hPiAtLT5cbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRGVsZXRlKClcIj5Db21wbGV0ZTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICA8L2FydGljbGU+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC5hdXRob3Ige1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgfVxuICAgICAgICAuY29uZmlnIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgd2lkdGg6IDE5JTtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIE15VG9kb0NvbXBvbmVudCB7XG4gICAgQElucHV0KCkgdG9kbzpUb2RvO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdG9kb1NlcnZpY2U6IFRvZG9TZXJ2aWNlKSB7fVxuXG5cbiAgICBvbkRlbGV0ZSgpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgICAgIGF1ZGlvLnNyYyA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2Fzc2V0cy9kaW5nLm1wM1wiO1xuICAgICAgICBhdWRpby5sb2FkKCk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgdGhpcy5fdG9kb1NlcnZpY2UuZGVsZXRlVG9kbyh0aGlzLnRvZG8pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtUb2RvU2VydmljZX0gZnJvbSAnLi90b2Rvcy5zZXJ2aWNlJztcbmltcG9ydCB7VG9kb30gZnJvbSBcIi4vdG9kb1wiO1xuaW1wb3J0IHtNeVRvZG9Db21wb25lbnR9IGZyb20gJy4vbXktdG9kby5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RvZG8tbGlzdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgIDxicj5cbiAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICA8bXktdG9kbyAqbmdGb3I9XCIjdG9kbyBvZiB0b2Rvc1wiIFt0b2RvXT1cInRvZG9cIiA+PC9teS10b2RvPiAgICAgXG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtNeVRvZG9Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFRvZG9MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RvZG9TZXJ2aWNlOiBUb2RvU2VydmljZSkge31cblxuICAgIHRvZG9zOiBUb2RvW107XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgIHRoaXMuX3RvZG9TZXJ2aWNlLmdldFRvZG9zKClcbiAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgdG9kb3MgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLnRvZG9zID0gdG9kb3M7IC8vZ2V0IGJhY2sgYW4gYXJyYXkgb2YgdG9kb3MgdG8gdXNlLiBcbiAgICAgICAgICAgICAgICAgdGhpcy5fdG9kb1NlcnZpY2UudG9kb3MgPSB0b2RvczsgLy9tYWtlIHN1cmUgdG9kb3Mgc3RvcmFnZSBpbiB0aGUgc2VydmljZXMgaXMgc3luY2VkIHVwIGZvciBsaXZlIHVwZGF0aW5nXG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0IHtUb2RvfSBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQge1RvZG9TZXJ2aWNlfSBmcm9tICcuL3RvZG9zLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndG9kby1pbnB1dCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdChmLnZhbHVlKVwiICNmPVwibmdGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cblxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmdDb250cm9sPVwidG9kb1wiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInRvZG9cIiAjaW5wdSBwbGFjZWhvbGRlcj1cIkFkZCBhIG5ldyB0b2RvIGl0ZW0uXCJ0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+QWRkIFRvZG88L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIGBcbiAgICBcbn0pXG5cbmV4cG9ydCBjbGFzcyBUb2RvSW5wdXRDb21wb25lbnQge1xuICAgICAgICB0b2RvOiBUb2RvID0gbnVsbDsgICAgXG4gICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90b2RvU2VydmljZTogVG9kb1NlcnZpY2Upe31cblxuICAgICAgb25TdWJtaXQoZm9ybTphbnkpIHtcbiAgICAgICAgY29uc3QgdG9kbzpUb2RvID0gbmV3IFRvZG8oZm9ybS50b2RvKTtcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKHRvZG8pO1xuICAgICAgICB0aGlzLl90b2RvU2VydmljZS5hZGRUb2Rvcyh0b2RvKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b2RvU2VydmljZS50b2Rvcy5wdXNoKGRhdGEpOyAvL3B1c2hpbmcgZGF0YSB0byB0aGUgdG9kb1NlcnZpY2UgYXJyYXkgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0l0IGdvdCB0aGlzIGZhci4nKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cbiAgICAgICAgICAgICk7ICBcblxuXG4gICAgfTsgLy9zZW5kIHRoZSB0b2RvXG5cblxuXG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1RvZG9MaXN0Q29tcG9uZW50fSBmcm9tICcuL3RvZG9zLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7VG9kb0lucHV0Q29tcG9uZW50fSBmcm9tICcuL3RvZG9zLWlucHV0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndG9kb3MnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx0b2RvLWlucHV0PjwvdG9kby1pbnB1dD5cbiAgICAgICAgPGJyPjxicj5cbiAgICAgICAgPHRvZG8tbGlzdD48L3RvZG8tbGlzdD5cbiAgICBgLFxuICAgIHN0eWxlczpbYFxuICAgIFxuICAgIGBdLFxuICAgIGRpcmVjdGl2ZXM6IFtUb2RvTGlzdENvbXBvbmVudCxUb2RvSW5wdXRDb21wb25lbnRdXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBUb2RvQ29tcG9uZW50IHtcblxufVxuXG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1RvZG9Db21wb25lbnR9IGZyb20gJy4vdG9kb3MvdG9kb3MuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPHRvZG9zPjwvdG9kb3M+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1RvZG9Db21wb25lbnRdXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgIHsgIFxuXG5cbn0iLCIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHlwaW5ncy9icm93c2VyLmQudHNcIi8+XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge0FwcENvbXBvbmVudH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtUb2RvU2VydmljZSB9IGZyb20gXCIuL3RvZG9zL3RvZG9zLnNlcnZpY2VcIjtcbmltcG9ydCB7Uk9VVEVSX1BST1ZJREVSUywgTG9jYXRpb25TdHJhdGVneSwgSGFzaExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjsgLy9yb3V0ZXIgcHJvdmlkZXJzIFxuaW1wb3J0IHtwcm92aWRlfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gZnJvbSBcImFuZ3VsYXIyL2h0dHBcIjtcblxuXG5ib290c3RyYXAoQXBwQ29tcG9uZW50LCBbVG9kb1NlcnZpY2UsIFJPVVRFUl9QUk9WSURFUlMsIHByb3ZpZGUoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOiBIYXNoTG9jYXRpb25TdHJhdGVneX0pLCBIVFRQX1BST1ZJREVSU10pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
