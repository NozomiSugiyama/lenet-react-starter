// @flow
import type { ToDoList } from '../../types/toDo'
import config from '../../config'

export default async (): Promise<ToDoList> => {
  const response = await fetch(`${config.api.uri}/to_do_list`)

  if (!response.ok) throw response

  const result: ToDoList = await response.json()
  return result
}
