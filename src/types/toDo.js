// @flow

export type ToDoItem = {|
  id: string,
  title: string,
  days: number,
  _status: {
    code: 'FETCHING' | 'CREATING' | 'DELETING' | 'UPDATING' | 'STABLE' | 'ERROR',
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
