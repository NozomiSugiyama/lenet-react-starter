// @flow
import React, { useRef } from 'react'
import type { ToDoItem } from '../ToDo'
import Button from '../Button'
import './InputToDo.modules.css'

type Props = {
  title: string,
  days: number,
  addDay: () => void,
  subtractionDay: () => void,
  save: (todo: ToDoItem) => void
}

const InputTodo = ({ title, days, addDay, subtractionDay, save }: Props) => {
  const todoValueElement = useRef<HTMLInputElement | null>(null)

  return (
    <div className="InputToDo">
      <div className="InputToDo__header">
        <h2>title: {title}</h2>
        <div>
          <h3>days: {days}</h3>
          <Button onClick={addDay}>加算ボタン</Button>
          <Button onClick={subtractionDay}>減算ボタン</Button>
        </div>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
          const target = todoValueElement.current
          if (!target) return

          save({
            key: Math.random().toString(),
            value: target.value || '',
            title,
            days
          })
          target.value = ''
        }}
        className="InputToDo__form"
      >
        <input ref={todoValueElement} />
        <Button component="button" type="submit">
          保存
        </Button>
      </form>
    </div>
  )
}

export default InputTodo
