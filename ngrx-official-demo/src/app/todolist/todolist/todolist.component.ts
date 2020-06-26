import {Component, OnInit} from '@angular/core';
import {TodoListItem} from '../todo.model';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from 'src/app/app.module';
import {selectTodoTodoList, ADD_TODO, REMOVE_TODO} from 'src/app/todo';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todoText: string;
  todoList$: Observable<TodoListItem[]>;

  constructor(private store: Store<AppState>) {
    this.todoList$ = store.pipe(
      select(selectTodoTodoList),
    );
  }

  ngOnInit(): void {
    console.log('this.todoList$ ', this.todoList$, typeof this.todoList$)
  }

  addItem() {

    this.store.dispatch({
      type: ADD_TODO,
      payload: {name: this.todoText, isfinished: false},
    });
  }

  removeItem(index: number) {
    console.log('adsadas', index)
    this.store.dispatch({
      type: REMOVE_TODO,
      payload: index,
    });
  }

}
