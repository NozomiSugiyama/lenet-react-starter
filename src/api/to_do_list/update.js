// @flow
import type { ToDoItem, UpdateToDoItem } from '../../types/toDo'
import config from '../../config'

export default async (toDo: UpdateToDoItem): Promise<ToDoItem> => {
  const response = await fetch(`${config.api.uri}/to_do_list/${toDo.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'UPDATE'
  })

  if (!response.ok) throw response

  const result = await response.json()
  return result
}
