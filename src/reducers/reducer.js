// @flow
import Actions from '../actions/AppActions'
import type { Action } from '../actions/AppActions'

type Exact<T> = T & $Shape<T>

export type ToDoItem = {
  key: string,
  title: string,
  days: number
}

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
