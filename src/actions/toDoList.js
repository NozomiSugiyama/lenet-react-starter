// @flow

import type { ToDoItem, CreateToDoItem } from '../types/toDo'
import * as toDoListApi from '../api/to_do_list'

export type Action = {
  type: 'CREATE_TODO' | 'DELETE_TODO' | 'FETCH_TODO',
  value: ToDoItem
}

const Actions = {
  CREATE_TODO: 'CREATE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  FETCH_TODO: 'FETCH_TODO',
  FETCH_FAILED: 'FETCH_FAILED',
  fetchToDo(): (dispatch: (x: Action) => void) => Promise<void> {
    return dispatch =>
      toDoListApi
        .read()
        .then(toDoList => dispatch({ type: Actions.CREATE_TODO, value: toDoList }))
        .catch(_error => dispatch({ type: Actions.CREATE_TODO, value: {} }))
  },
  createToDo(value: CreateToDoItem): (dispatch: (x: Action) => void) => Promise<void> {
    return dispatch =>
      toDoListApi
        .create(value)
        .then((toDo: ToDoItem) => dispatch({ type: Actions.CREATE_TODO, value: toDo }))
        .catch(_error => dispatch({ type: Actions.CREATE_TODO, value: {} }))
  },
  deleteToDo(value: ToDoItem): (dispatch: (x: Action) => void) => Promise<void> {
    return dispatch =>
      toDoListApi
        .delete(value)
        .then((toDo: ToDoItem) => dispatch({ type: Actions.DELETE_TODO, value }))
        .catch(_error => dispatch({ type: Actions.DELETE_TODO, value: {} }))
  }
}

export default Actions
