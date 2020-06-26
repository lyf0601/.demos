import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {counterReducer} from './counter';
import {StoreModule, MetaReducer, ActionReducer, ActionReducerMap} from '@ngrx/store';
import {TodolistComponent} from './todolist/todolist/todolist.component';
import {FormsModule} from '@angular/forms';
import { todoReducer } from './todo';
import {TodoState} from './todolist/todo.model';
import { environment } from 'src/environments/environment';

export interface AppState {
  count: number;
  todo: TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  count: counterReducer,
  todo: todoReducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers, {metaReducers})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
