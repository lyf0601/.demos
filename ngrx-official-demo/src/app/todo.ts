import {Action, createSelector} from '@ngrx/store';
import {TodoListItem, TodoState} from './todolist/todo.model';
import { AppState } from './app.module';

export const ADD_TODO = 'ADD TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

class AddTodoAction implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: TodoListItem) {
  }
}

class RemoveTodoAction implements Action {
  readonly type = REMOVE_TODO;

  constructor(public payload: number) {
  }
}

export type TodoActionUnion = AddTodoAction | RemoveTodoAction;

const initialState: TodoState = {
  todoList: [{
    name: 'first',
    isFinished: false,
  }],
};

export function todoReducer(state: TodoState = initialState, action: TodoActionUnion) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload]
      };

    case REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((item, index) => index !== action.payload)
      };

    default:
      return state;
  }
}

export const selectTodo = (state: AppState) => state.todo;
export const selectTodoTodoList = createSelector(
  selectTodo,
  (state: TodoState) => state.todoList
);
