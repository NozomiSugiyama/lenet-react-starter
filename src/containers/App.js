// @flow
import React, { useState } from 'react'
import './App.css'
import ToDo from '../components/ToDo'
import InputToDo from '../components/InputToDo'
import type { ToDoItem } from '../components/Todo'

type Props = {}

const App = (props: Props) => {
  const [toDoList, setToDoList] = useState<ToDoItem[]>([])

  return (
    <div className="App">
      <main>
        <InputToDo save={(todo: ToDoItem) => setToDoList(toDoList => toDoList.concat(todo))} />
        <hr />
        <ToDo toDoList={toDoList} />
      </main>
    </div>
  )
}

export default App
