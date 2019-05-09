// @flow

import type { ToDoItem } from '../types/toDo'

export type Action = {
  type: 'ADD_TODO' | 'DELETE_TODO',
  value: ToDoItem
}

const Actions = {
  ADDTODO: 'ADD_TODO',
  DELETETODO: 'DELETE_TODO',
  addToDo(value: ToDoItem): { type: 'ADD_TODO', value: ToDoItem } {
    return {
      type: 'ADD_TODO',
      value
    }
  },
  deleteToDo(value: ToDoItem): { type: 'DELETE_TODO', value: ToDoItem } {
    return {
      type: 'DELETE_TODO',
      value
    }
  }
}

export default Actions
