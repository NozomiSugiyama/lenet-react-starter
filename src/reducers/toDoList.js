// @flow
import Actions from '../actions/toDoList'
import type { Action } from '../actions/toDoList'
import type { ToDoItem } from '../types/toDo'

type Exact<T> = T & $Shape<T>

type State = {
  toDoList: ToDoItem[]
}

const initialState: State = {
  toDoList: []
}

const reducer = (state: State = initialState, action: Action): Exact<State> => {
  switch (action.type) {
    case Actions.CREATE_TODO: {
      return { ...state, toDoList: state.toDoList.concat(action.value) }
    }
    case Actions.DELETE_TODO: {
      return { ...state, toDoList: state.toDoList.filter(x => x.id !== action.value.id) }
    }
    default: {
      return state
    }
  }
}

export default reducer
