// @flow
import type { ToDoItem } from '../../types/toDo'
import config from '../../config'

export default async (id: string): Promise<ToDoItem> => {
  const response = await fetch(`${config.api.uri}/to_do_list/${id}`)

  if (!response.ok) throw response

  const result: ToDoItem = await response.json()
  return result
}
