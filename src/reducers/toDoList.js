// @flow

import {
  FETCHING_TO_DO_LIST,
  FETCH_TO_DO_LIST_SUCCESS,
  FETCH_TO_DO_LIST_FAILURE,
  CREATING_TO_DO,
  CREATE_TO_DO_SUCCESS,
  CREATE_TO_DO_FAILURE,
  DELETING_TO_DO,
  DELETE_TO_DO_SUCCESS,
  DELETE_TO_DO_FAILURE,
  type Action
} from '../actions/toDoList'
import { type ToDoList, type ToDoItem, type CreateToDoItem, type ToDoResponseItem } from '../types/toDo'
import { type StatusCode } from '../types/statusCode'

type Exact<T> = T & $Shape<T>

type State = {|
  toDoList: ToDoList,
  status: {
    code: StatusCode,
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
    case FETCHING_TO_DO_LIST: {
      return { ...state, status: { code: 'FETCHING' } }
    }
    case FETCH_TO_DO_LIST_SUCCESS: {
      // TO_DO: Fix Type Cast
      const payload: ToDoResponseItem[] = (action.payload: any)
      return {
        ...state,
        toDoList: payload.map(x => ({ ...x, _status: { code: 'STABLE' } })),
        status: { code: 'STABLE' }
      }
    }
    case FETCH_TO_DO_LIST_FAILURE: {
      return { ...state, status: { code: 'ERROR', errors: action.errors } }
    }
    case CREATING_TO_DO: {
      // TO_DO: Fix Type Cast
      const payload: CreateToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.concat({
          id: payload._meta.temporaryId,
          days: payload.days,
          title: payload.title,
          _status: { code: 'CREATING' },
          _meta: {
            temporaryId: payload._meta.temporaryId
          }
        })
      }
    }
    case CREATE_TO_DO_SUCCESS: {
      // TO_DO: Fix Type Cast
      const payload: CreateToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.map(x =>
          (x._meta && x._meta.temporaryId) === payload._meta.temporaryId
            ? {
                ...payload,
                id: (payload.id: any),
                days: payload.days,
                title: payload.title,
                _status: { code: 'STABLE' }
              }
            : x
        )
      }
    }
    case CREATE_TO_DO_FAILURE: {
      // TO_DO: Fix Type Cast
      const payload: ToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.map(x =>
          x.id !== payload.id ? { ...x, _status: { code: 'ERROR', error: action.errors } } : x
        )
      }
    }
    case DELETING_TO_DO: {
      // TO_DO: Fix Type Cast
      const payload: ToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.map(x => (x.id !== payload.id ? { ...x, _status: { code: 'DELETING' } } : x))
      }
    }
    case DELETE_TO_DO_SUCCESS: {
      // TO_DO: Fix Type Cast
      const payload: ToDoItem = (action.payload: any)
      return {
        ...state,
        toDoList: state.toDoList.filter(x => x.id !== payload.id)
      }
    }
    case DELETE_TO_DO_FAILURE: {
      // TO_DO: Fix Type Cast
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
