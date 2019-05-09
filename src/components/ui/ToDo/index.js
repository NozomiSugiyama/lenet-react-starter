// @flow
import React, { Fragment, useState } from 'react'
import './ToDo.modules.css'
import LabeledItem from '../LabeledItem'
import Dialog from '../Dialog'
import DialogBody from '../DialogBody'
import DialogHeader from '../DialogHeader'
import DialogFooter from '../DialogFooter'
import Button from '../Button'
import type { ToDoItem } from '../../../types/toDo'

type Props = {
  toDoList: ToDoItem[],
  deleteToDo: (toDo: ToDoItem) => void
}

const ToDo = ({ toDoList, deleteToDo }: Props) => {
  const [selectedToDo, selectToDo] = useState<ToDoItem | null>(null)

  return (
    <Fragment>
      <ul className="ToDo">
        {toDoList.map(x => (
          <li key={x.id}>
            <LabeledItem label="title">{x.title}</LabeledItem>
            <LabeledItem label="days">{x.days}</LabeledItem>
            <div className="ToDo__DeleteButton" onClick={() => selectToDo(x)} />
          </li>
        ))}
      </ul>
      <Dialog visible={!!selectedToDo} onCancel={() => selectToDo(null)}>
        <DialogHeader>Are you sure to delete this item?</DialogHeader>
        <DialogBody className="ToDo__DialogBody">
          <LabeledItem label="title">{selectedToDo && selectedToDo.title}</LabeledItem>
          <LabeledItem label="days">{selectedToDo && selectedToDo.days}</LabeledItem>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => {
              selectedToDo && deleteToDo(selectedToDo)
              selectToDo(null)
            }}
          >
            Yes
          </Button>
          <Button onClick={() => selectToDo(null)}>No</Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  )
}

export default ToDo
