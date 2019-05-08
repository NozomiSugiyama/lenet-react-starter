// @flow

import type { ToDoItem } from '../reducers/reducer.js'

export type Action = {
  type: 'ADDTODO' | 'DELETETODO',
  value: ToDoItem
}

const Actions = {
  ADDTODO: 'ADDTODO',
  DELETETODO: 'DELETETODO',
  addToDo(value: ToDoItem): { type: 'ADDTODO', value: ToDoItem } {
    return {
      type: 'ADDTODO',
      value
    }
  },
  deleteToDo(value: ToDoItem): { type: 'DELETETODO', value: ToDoItem } {
    return {
      type: 'DELETETODO',
      value
    }
  }
}

export default Actions
