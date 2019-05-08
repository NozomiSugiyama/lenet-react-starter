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
  toDoList: ToDoItem[],
  deleteToDo: (key: string) => void
}

const ToDo = ({ toDoList, deleteToDo }: Props) => (
  <ul className="ToDo">
    {toDoList.map(x => (
      <li key={x.key}>
        <LabeledItem label="title">{x.title}</LabeledItem>
        <LabeledItem label="days">{x.days}</LabeledItem>
        <div className="ToDo__DeleteButton" onClick={() => deleteToDo(x.key)} />
      </li>
    ))}
  </ul>
)

export default ToDo
