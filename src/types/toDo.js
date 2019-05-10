// @flow
import { type StatusCode } from './statusCode'

export type ToDoResponseItem = {
  id: string,
  title: string,
  days: number
}

export type ToDoMeta = {
  temporaryId: string
}

export type ToDoItem = {|
  id: string,
  title: string,
  days: number,
  _status: {
    code: StatusCode,
    errors?: [
      {
        message: string
      }
    ]
  },
  _meta?: ToDoMeta
|}

export type ToDoList = ToDoItem[]

export type CreateToDoItem = {|
  id?: string,
  title: string,
  days: number,
  _meta: ToDoMeta
|}

export type SaveToDoItem = {|
  id?: string,
  title: string,
  days: number
|}

export type UpdateToDoItem = {|
  id: string,
  title?: string,
  days?: number
|}
