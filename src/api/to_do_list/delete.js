// @flow
import type { ToDoItem } from '../../types/toDo'
import config from '../../config'

export default async (toDo: ToDoItem) => {
  const response = await fetch(`${config.api.uri}/to_do_list/${toDo.id}`, { method: 'DELETE' })

  if (!response.ok) throw response

  const result = await response.json()
  return result
}
