///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {TodoService } from "./todos/todos.service";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router"; //router providers 
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";


bootstrap(AppComponent, [TodoService, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy}), HTTP_PROVIDERS]);