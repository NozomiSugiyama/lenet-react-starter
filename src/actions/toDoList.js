// @flow

import type { Dispatch as ReduxDispatch } from 'redux'
import { type ToDoItem, type ToDoList, type CreateToDoItem, type ToDoResponseItem } from '../types/toDo'
import * as toDoListApi from '../api/to_do_list'

type FETCH_TODO_LIST = 'FETCHING_TODO_LIST' | 'FETCH_TODO_LIST_SUCCESS' | 'FETCH_TODO_LIST_FAILURE'
type CREATE_TODO_LIST = 'CREATING_TODO' | 'CREATE_TODO_SUCCESS' | 'CREATE_TODO_FAILURE'
type DELETE_TODO_LIST = 'DELETING_TODO' | 'DELETE_TODO_SUCCESS' | 'DELETE_TODO_FAILURE'

export type Action = {|
  type: FETCH_TODO_LIST | CREATE_TODO_LIST | DELETE_TODO_LIST,
  payload?: ToDoItem | CreateToDoItem | ToDoList,
  errors?: [
    {
      message: string
    }
  ]
|}

export type Thunk<A> = (() => Promise<void> | void) => A

export type Dispatch = ReduxDispatch<Action> & Thunk<Action>

export const FETCHING_TODO_LIST = 'FETCHING_TODO_LIST'
export const FETCH_TODO_LIST_SUCCESS = 'FETCH_TODO_LIST_SUCCESS'
export const FETCH_TODO_LIST_FAILURE = 'FETCH_TODO_LIST_FAILURE'
export type FetchToDoListAction = Action & {| payload?: ToDoList |}
export const fetchToListDoList = () => (dispatch: Dispatch) => {
  dispatch({ type: FETCHING_TODO_LIST })
  toDoListApi
    .read()
    .then(toDoList => dispatch({ type: FETCH_TODO_LIST_SUCCESS, payload: toDoList }))
    .catch(error => dispatch({ type: FETCH_TODO_LIST_FAILURE, errors: [error] }))
}

export const CREATING_TODO = 'CREATING_TODO'
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS'
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE'
export type CreateToDoAction = {|
  ...Action,
  payload: CreateToDoItem
|}
export const createToDo = (payload: CreateToDoItem) => (dispatch: Dispatch) => {
  const temporaryId = Math.random().toString()
  dispatch({ type: CREATING_TODO, payload: { ...payload, id: temporaryId, _meta: { temporaryId } } })
  toDoListApi
    .create(payload)
    .then((toDo: ToDoResponseItem) => {
      const toDoCreate = {
        id: toDo.id,
        title: toDo.title,
        days: toDo.days
      }
      dispatch({ type: CREATE_TODO_SUCCESS, payload: { ...toDoCreate, _meta: { temporaryId } } })
    })
    .catch(error => dispatch({ type: CREATE_TODO_FAILURE, payload, errors: [error] }))
}

export const DELETING_TODO = 'DELETING_TODO'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE'
export type DeleteToDoAction = {|
  ...Action,
  payload: ToDoItem
|}
export const deleteToDo = (payload: ToDoItem) => (dispatch: Dispatch) => {
  dispatch({ type: DELETING_TODO, payload })
  toDoListApi
    .delete(payload)
    .then((toDo: ToDoItem) => dispatch({ type: DELETE_TODO_SUCCESS, payload }))
    .catch(error => dispatch({ type: DELETE_TODO_FAILURE, payload, errors: [error] }))
}
