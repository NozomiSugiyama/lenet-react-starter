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
    case Actions.ADDTODO: {
      return { ...state, toDoList: state.toDoList.concat(action.value) }
    }
    case Actions.DELETETODO: {
      return { ...state, toDoList: state.toDoList.filter(x => x.key !== action.value.key) }
    }
    default: {
      return state
    }
  }
}

export default reducer
