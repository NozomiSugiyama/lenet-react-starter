// @flow

import {
  FETCHING_TODO_LIST,
  FETCH_TODO_LIST_SUCCESS,
  FETCH_TODO_LIST_FAILURE,
  CREATING_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  DELETING_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  type Action
} from '../actions/toDoList'
import { type ToDoList, type ToDoItem, type CreateToDoItem } from '../types/toDo'

type Exact<T> = T & $Shape<T>

type State = {|
  toDoList: ToDoList,
  status: {
    code: 'FETCHING' | 'CREATING' | 'DELETING' | 'UPDATING' | 'STABLE' | 'ERROR',
    errors?: [
      {
        message: string
      }
    ]
  }
|}

const initialState: State = {
  toDoList: [],
  status: {
    code: 'STABLE'
  }
}

const reducer = (state: State = initialState, action: Action): Exact<State> => {
  switch (action.type) {
    case FETCHING_TODO_LIST: {
      return { ...state, status: { code: 'FETCHING' } }
    }
    case FETCH_TODO_LIST_SUCCESS: {
      // TODO: Fix Type Cast
      const payload: ToDoList = (action.payload: any)
      return { ...state, toDoList: payload, status: { code: 'STABLE' } }
    }
    case FETCH_TODO_LIST_FAILURE: {
      return { ...state, status: { code: 'ERROR', errors: action.errors } }
    }
    case CREATING_TODO: {
      // TODO: Fix Type Cast
      const payload: CreateToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.concat({
          id: payload._id,
          days: payload.days,
          title: payload.title,
          _status: { code: 'CREATING' }
        })
      }
    }
    case CREATE_TODO_SUCCESS: {
      // TODO: Fix Type Cast
      const payload: CreateToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.map(x =>
          x.id === payload._id
            ? {
                id: payload.id || '',
                days: payload.days,
                title: payload.title,
                _status: payload.id ? { code: 'STABLE' } : { code: 'ERROR' }
              }
            : x
        )
      }
    }
    case CREATE_TODO_FAILURE: {
      // TODO: Fix Type Cast
      const payload: ToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.map(x =>
          x.id !== payload.id ? { ...x, _status: { code: 'ERROR', error: action.errors } } : x
        )
      }
    }
    case DELETING_TODO: {
      // TODO: Fix Type Cast
      const payload: ToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.map(x => (x.id !== payload.id ? { ...x, _status: { code: 'DELETING' } } : x))
      }
    }
    case DELETE_TODO_SUCCESS: {
      // TODO: Fix Type Cast
      const payload: ToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.filter(x => x.id !== payload.id)
      }
    }
    case DELETE_TODO_FAILURE: {
      // TODO: Fix Type Cast
      const payload: ToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.map(x =>
          x.id !== payload.id ? { ...x, _status: { code: 'ERROR', error: action.errors } } : x
        )
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
