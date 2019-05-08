// @flow
import React, { useRef, useState } from 'react'
import type { ToDoItem } from '../ToDo'
import Button from '../Button'
import './InputToDo.modules.css'

type Props = {
  save: (todo: ToDoItem) => void
}

const InputTodo = ({ save }: Props) => {
  const todoValueElement = useRef<HTMLInputElement | null>(null)
  const [title, setTitle] = useState<string>('')
  const [days, setDays] = useState<number>(0)

  return (
    <div className="InputToDo">
      <div className="InputToDo__header">
        <h2>title: {title}</h2>
        <div>
          <h3>days: {days}</h3>
          <Button onClick={() => setDays(n => n + 1)}>加算ボタン</Button>
          <Button onClick={() => setDays(n => (n > 0 ? n - 1 : n))}>減算ボタン</Button>
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
          setTitle('')
        }}
        className="InputToDo__form"
      >
        <input ref={todoValueElement} onChange={e => setTitle(e.target.value)} />
        <Button component="button" type="submit">
          保存
        </Button>
      </form>
    </div>
  )
}

export default InputTodo
