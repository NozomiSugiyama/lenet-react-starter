// @flow
import { type StatusCode } from './statusCode'

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
  }
|}

export type ToDoList = ToDoItem[]

export type CreateToDoItem = {|
  id?: string,
  _id: string,
  title: string,
  days: number
|}

export type UpdateToDoItem = {|
  id: string,
  title?: string,
  days?: number
|}
