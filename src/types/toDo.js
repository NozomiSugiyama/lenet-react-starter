// @flow

export type ToDoItem = {
  id: string,
  title: string,
  days: number
}

export type ToDoList = ToDoItem[]

export type PostToDoItem = {
  id?: string,
  title: string,
  days: number
}

export type UpdateToDoItem = {
  id: string,
  title?: string,
  days?: number
}
