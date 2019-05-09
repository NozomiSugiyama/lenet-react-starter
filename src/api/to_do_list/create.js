// @flow
import type { ToDoItem } from '../../types/toDo'
import config from '../../config'

export default async (toDo: ToDoItem): Promise<ToDoItem> => {
  const response = await fetch(`${config.api.uri}/to_do_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toDo)
  })

  if (!response.ok) throw response

  const result: ToDoItem = await response.json()
  return result
}
