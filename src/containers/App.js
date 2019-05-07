// @flow
import React, { useState } from 'react'
import './App.css'
import ToDo from '../components/ToDo'
import InputToDo from '../components/InputToDo'
import type { ToDoItem } from '../components/Todo'

type Props = {}

const App = (props: Props) => {
  const [toDoList, setToDoList] = useState<ToDoItem[]>([])
  const [days, setDays] = useState<number>(0)

  return (
    <div className="App">
      <main>
        <InputToDo
          title="aaaaaaa"
          days={days}
          addDay={() => setDays(days + 1)}
          subtractionDay={() => setDays(days - 1)}
          save={(todo: ToDoItem) => setToDoList(toDoList.concat(todo))}
        />
        <hr />
        <ToDo toDoList={toDoList} />
      </main>
    </div>
  )
}

export default App
