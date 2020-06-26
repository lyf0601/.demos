export interface TodoListItem {
  name: string;
  isFinished: boolean;
}

export interface TodoState {
  todoList: TodoListItem[];
}
