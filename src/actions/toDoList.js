// @flow

import type { Dispatch as ReduxDispatch } from 'redux'
import { type ToDoItem, type ToDoList, type CreateToDoItem, type ToDoResponseItem } from '../types/toDo'
import * as toDoListApi from '../api/to_do_list'

type FETCH_TO_DO_LIST = 'FETCHING_TO_DO_LIST' | 'FETCH_TO_DO_LIST_SUCCESS' | 'FETCH_TO_DO_LIST_FAILURE'
type CREATE_TO_DO_LIST = 'CREATING_TO_DO' | 'CREATE_TO_DO_SUCCESS' | 'CREATE_TO_DO_FAILURE'
type DELETE_TO_DO_LIST = 'DELETING_TO_DO' | 'DELETE_TO_DO_SUCCESS' | 'DELETE_TO_DO_FAILURE'

export type Action = {|
  type: FETCH_TO_DO_LIST | CREATE_TO_DO_LIST | DELETE_TO_DO_LIST,
  payload?: ToDoItem | CreateToDoItem | ToDoList,
  errors?: [
    {
      message: string
    }
  ]
|}

export type Thunk<A> = (() => Promise<void> | void) => A

export type Dispatch = ReduxDispatch<Action> & Thunk<Action>

export const FETCHING_TO_DO_LIST = 'FETCHING_TO_DO_LIST'
export const FETCH_TO_DO_LIST_SUCCESS = 'FETCH_TO_DO_LIST_SUCCESS'
export const FETCH_TO_DO_LIST_FAILURE = 'FETCH_TO_DO_LIST_FAILURE'
export type FetchToDoListAction = Action & {| payload?: ToDoList |}
export const fetchToListDoList = () => (dispatch: Dispatch) => {
  dispatch({ type: FETCHING_TO_DO_LIST })
  toDoListApi
    .read()
    .then(toDoList => dispatch({ type: FETCH_TO_DO_LIST_SUCCESS, payload: toDoList }))
    .catch(error => dispatch({ type: FETCH_TO_DO_LIST_FAILURE, errors: [error] }))
}

export const CREATING_TO_DO = 'CREATING_TO_DO'
export const CREATE_TO_DO_SUCCESS = 'CREATE_TO_DO_SUCCESS'
export const CREATE_TO_DO_FAILURE = 'CREATE_TO_DO_FAILURE'
export type CreateToDoAction = {|
  ...Action,
  payload: CreateToDoItem
|}
export const createToDo = (payload: CreateToDoItem) => (dispatch: Dispatch) => {
  const temporaryId = Math.random().toString()
  dispatch({ type: CREATING_TO_DO, payload: { ...payload, id: temporaryId, _meta: { temporaryId } } })
  toDoListApi
    .create(payload)
    .then((toDo: ToDoResponseItem) => {
      const toDoCreate = {
        id: toDo.id,
        title: toDo.title,
        days: toDo.days
      }
      dispatch({ type: CREATE_TO_DO_SUCCESS, payload: { ...toDoCreate, _meta: { temporaryId } } })
    })
    .catch(error => dispatch({ type: CREATE_TO_DO_FAILURE, payload, errors: [error] }))
}

export const DELETING_TO_DO = 'DELETING_TO_DO'
export const DELETE_TO_DO_SUCCESS = 'DELETE_TO_DO_SUCCESS'
export const DELETE_TO_DO_FAILURE = 'DELETE_TO_DO_FAILURE'
export type DeleteToDoAction = {|
  ...Action,
  payload: ToDoItem
|}
export const deleteToDo = (payload: ToDoItem) => (dispatch: Dispatch) => {
  dispatch({ type: DELETING_TO_DO, payload })
  toDoListApi
    .delete(payload)
    .then((toDo: ToDoItem) => dispatch({ type: DELETE_TO_DO_SUCCESS, payload }))
    .catch(error => dispatch({ type: DELETE_TO_DO_FAILURE, payload, errors: [error] }))
}
