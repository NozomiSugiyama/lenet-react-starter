// @flow
import React from 'react'
import './ToDo.modules.css'
import LabeledItem from '../LabeledItem'

export type ToDoItem = {
  key: string,
  title: string,
  days: number
}

type Props = {
  toDoList: ToDoItem[]
}

const ToDo = ({ toDoList }: Props) => (
  <ul className="ToDo">
    {toDoList.map(x => (
      <li key={x.key}>
        <LabeledItem label="title">{x.title}</LabeledItem>
        <LabeledItem label="days">{x.days}</LabeledItem>
      </li>
    ))}
  </ul>
)

export default ToDo
