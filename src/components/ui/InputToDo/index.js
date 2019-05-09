// @flow
import React, { useRef, useState } from 'react'
import Button from '../Button'
import './InputToDo.modules.css'
import type { CreateToDoItem } from '../../../types/toDo'

type Props = {
  save: (toDo: CreateToDoItem) => void
}

const InputTodo = ({ save }: Props) => {
  const toDoValueElement = useRef<HTMLInputElement | null>(null)
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
          const target = toDoValueElement.current
          if (!target) return

          save({
            title,
            days
          })
          target.value = ''
          setTitle('')
        }}
        className="InputToDo__form"
      >
        <input ref={toDoValueElement} onChange={e => setTitle(e.target.value)} />
        <Button component="button" type="submit">
          保存
        </Button>
      </form>
    </div>
  )
}

export default InputTodo
